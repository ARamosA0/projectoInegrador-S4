import RegAuto from '../components/nuevoregistroautovalidacion'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it, fireEvent } from 'vitest'

describe('RegAuto', () => {
  afterEach(cleanup)

  // Ver si se renderiza en componente
  it('Should render', () => {
    render(<RegAuto />)
  })

  // Ver si se renderizan inputs
  it('should render input', () => {
    render(<RegAuto />)
    screen.getAllByRole('textbox')
  })

  // Ver si estan los campos del formulario requeridos
  it('should render fields', () => {
    render(<RegAuto />)
    const fields = ['Marca del vehiculo', 'Modelo del vehiculo', 'Placa del vehiculo',
      'Imagen del vehiculo', 'Fecha de adquisicion del vehiculo',
      'Color del vehiculo', 'Descripcion del vehiculo']

    fields.forEach(field => {
      screen.getAllByText(field)
    })
  })

  it('should register form after clik save button', () => {
    render(<RegAuto />)
    const agregar = screen.getByText('AGREGAR VEHICULO')
    fireEvent.click(agregar)
  })
})
