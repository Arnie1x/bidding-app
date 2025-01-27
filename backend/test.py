import time
import jwt


payload = {
    'sub': '1234967890',
    'name': 'John Doe',
    'iat': int(time.time())
}

secret = 'Ravipass'

encoded_jwt = jwt.encode(payload, secret, algorithm='HS256')
print(encoded_jwt)