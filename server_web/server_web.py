import os
import socket

# creeaza un server socket
serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# specifica ca serverul va rula pe portul 5678, accesibil de pe orice ip al serverului
serversocket.bind(('', 5678))
# serverul poate accepta conexiuni; specifica cati clienti pot astepta la coada
serversocket.listen(5)

if __name__ == '__main__':
	while True:
		print('#########################################################################')
		print('Serverul asculta potentiali clienti.')
		# asteapta conectarea unui client la server
		# metoda `accept` este blocanta => clientsocket, care reprezinta socket-ul corespunzator clientului conectat
		(clientsocket, address) = serversocket.accept()
		print('S-a conectat un client.')
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
		print('S-a terminat cititrea.')

		elements = linieDeStart.split(' ')
		resursaCeruta = linieDeStart[1]

		fileName = '../continut'+ resursaCeruta
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
				'json': 'application/json'
			}
			tipResursa = tipuriMedia.get(extensie)

			clientsocket.sendall(bytes('HTTP/1.1 200 OK\r\n', 'utf-8'))
			clientsocket.sendall(bytes('Content-Length: ' + str(os.stat(fileName).st_size) + '\r\n', 'utf-8'))
			clientsocket.sendall(bytes('Content-Type: ' + tipResursa + '\r\n', 'utf-8'))
			clientsocket.sendall(bytes('Server: Server-ul PW\r\n', 'utf-8'))
			clientsocket.sendall(bytes('\r\n', 'utf-8'))
			buffer = fileManager.read(1024)
			while buffer:
				clientsocket.send(buffer)
				buffer = fileManager.read(1024)

		except IOError:
			message = 'Eroare! Resursa' + resursaCeruta + 'nu a fost gastia.'
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