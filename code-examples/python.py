from enum import Enum
'''
lOCALIZAÇÃO DAS POSIÇÕES

    UM  |  DOIS  | TRÊS  
--------|--------|--------
 QUATRO | CINCO  | SEIS
--------|--------|--------
  SETE  |  OITO  | NOVE
'''

class Posi(Enum):
    UM = '1'
    DOIS = '2'
    TRES = '3'
    QUATRO = '4'
    CINCO = '5'
    SEIS = '6'
    SETE = '7'
    OITO = '8'
    NOVE = '9'

def play():
    return Posi.UM

print(play().value)