import {InvalidFormatError, InvalidIntegerError, InvalidLengthError, InvalidNumberError, InvalidStringError} from '../errors/errors.js'

export function validarEmail(valor) {
  if (!valor) throw new EmptyFieldError();
  if (typeof valor !== 'string') throw new InvalidStringError();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(valor)) throw new InvalidFormatError();
  return valor;
}

export function validarLongitudMinima(valor, longitudMinima) {
  if (!valor) throw new EmptyFieldError();
  if (typeof valor !== 'string') throw new InvalidStringError();
  if (valor.length < longitudMinima) throw new InvalidLengthError();
  return valor;
}

export function validarString(valor){
    if (!valor) throw new EmptyFieldError()
    if (typeof valor !== 'string') throw new InvalidStringError()
    return valor
}
export function validarNumero(valor){
    if (!valor) throw new EmptyFieldError()
    if (typeof valor !== 'number') throw new InvalidNumberError()
    return Number(valor)
}
export function validarNumeroEntero(valor){
    if (!valor) throw new EmptyFieldError()
    validarNumero(valor)
    if (!Number.isInteger(Number(valor))) throw new InvalidIntegerError()
    return Number(valor)
}

