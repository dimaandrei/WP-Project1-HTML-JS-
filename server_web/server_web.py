import gzip
import json
import os
import socket
# creeaza un server socket
import threading

serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# specifica ca serverul va rula pe portul 5678, accesibil de pe orice ip al serverului
serversocket.bind(('', 5678))
# serverul poate accepta conexiuni; specifica cati clienti pot astepta la coada
serversocket.listen(5)


def newClient(clientsocket, address):
    compressGZIP = False
    # se proceseaza cererea si se citeste prima linie de text
    cerere = ''
    linieDeStart = ''
    while True:
        data = clientsocket.recv(1024)
        cerere = cerere + data.decode()
        print('S-a citit mesajul: \n---------------------------\n' + cerere + '\n---------------------------')
        pozitie = cerere.find('\r\n')
        if (pozitie > -1):
            linieDeStart = cerere[0:pozitie]
            print('S-a citit linia de start din cerere: ##### ' + linieDeStart + ' #####')
            break
    print('S-a terminat citirea.')

    elements = linieDeStart.split(' ')
    resursaCeruta = elements[1]

    if elements[0] == 'POST':
        if elements[1] == '/api/utilizatori':
            message = cerere.split("\r\n\r\n")[1]
            jsonObject = json.loads(message)
            data = []
            with open('../continut/resurse/utilizatori.json') as json_file:
                data = json.load(json_file)
                data.append(jsonObject)
            with open('../continut/resurse/utilizatori.json', 'w') as outfile:
                json.dump(data, outfile)
            message = "Fisierul cu utilizatori a fost updatat!!!!!"
            print(message)
            clientsocket.sendall(bytes('HTTP/1.1 200 OK\r\n', 'utf-8'))
            clientsocket.sendall(bytes('Content-Length: ' + str(len(message.encode('utf-8'))) + '\r\n', 'utf-8'))
            clientsocket.sendall(bytes('Content-Type: text/plain\r\n', 'utf-8'))
            clientsocket.sendall(bytes('Server: Server-ul PW\r\n', 'utf-8'))
            clientsocket.sendall(bytes('\r\n', 'utf-8'))
            clientsocket.sendall(bytes(message, 'utf-8'))
            clientsocket.close()
            return


    fileName = '../continut' + resursaCeruta
    fileManager = None
    try:
        fileManager = open(fileName, 'rb')
        extensie = resursaCeruta.split('.')[-1]
        tipuriMedia = {
            'html': 'text/html',
            'css': 'text/css',
            'js': 'application/js',
            'png': 'image/png',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'gif': 'image/gif',
            'ico': 'image/x-icon',
            'xml': 'application/xml',
            'json': 'application/json',
            'webp': 'image/webp'
        }
        tipResursa = tipuriMedia.get(extensie)
        clientsocket.sendall(bytes('HTTP/1.1 200 OK\r\n', 'utf-8'))
        clientsocket.sendall(bytes('Content-Length: ' + str(os.stat(fileName).st_size) + '\r\n', 'utf-8'))
        clientsocket.sendall(bytes('Content-Type: ' + tipResursa + '\r\n', 'utf-8'))

        clientsocket.sendall(bytes('Server: Server-ul PW\r\n', 'utf-8'))
        clientsocket.sendall(bytes('Content-Encoding: gzip\r\n', 'utf-8'))
        clientsocket.sendall(bytes('\r\n', 'utf-8'))
        buffer = fileManager.read()
        # while buffer:
        # buffer += fileManager.read(1024)
        clientsocket.send(bytes(gzip.compress(buffer)))

    except IOError:
        message = 'Eroare! Resursa ' + resursaCeruta + ' nu a fost gasita.'
        print(message)
        clientsocket.sendall(bytes('HTTP/1.1 404 Not Found\r\n', 'utf-8'))
        clientsocket.sendall(bytes('Content-Length: ' + str(len(message.encode('utf-8'))) + '\r\n', 'utf-8'))
        clientsocket.sendall(bytes('Content-Type: text/plain\r\n', 'utf-8'))
        clientsocket.sendall(bytes('Server: Server-ul PW\r\n', 'utf-8'))
        clientsocket.sendall(bytes('\r\n', 'utf-8'))
        clientsocket.sendall(bytes(message, 'utf-8'))
    finally:
        if fileManager is not None:
            fileManager.close()
    clientsocket.close()
    print('S-a terminat comunicarea cu clientul.')


if __name__ == '__main__':
    while True:
        print('#########################################################################')
        print('Serverul asculta potentiali clienti.')
        # asteapta conectarea unui client la server
        # metoda `accept` este blocanta => clientsocket, care reprezinta socket-ul corespunzator clientului conectat
        (clientsocket, address) = serversocket.accept()
        print('S-a conectat un client.')
        threading.Thread(newClient(clientsocket, address)).start()