from enum import Enum
import sys

def converte_array(args = ['0','0','0','0','0','0','0','0','0']):
    array = args[1:]
    matrix = [array[0:3], array[3:6], array[6:9]]
    return matrix

ESPACO_VAZIO = '0'
JOGADA_SUA = '1'
JOGADA_ADVERSARIO = '2'

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

def play(tabela):
    if(tabela[1][0] == ESPACO_VAZIO):
        return Posi.QUATRO
    if(tabela[1][1] == ESPACO_VAZIO):
        return Posi.CINCO
    if(tabela[1][2] == ESPACO_VAZIO):
        return Posi.SEIS
    if(tabela[2][0] == ESPACO_VAZIO):
        return Posi.SETE
    return Posi.DOIS

print(play(converte_array(sys.argv)).value, end='')