package com.miempresa.myapplication.ui.telemetria

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import com.miempresa.myapplication.R
import android.graphics.Color
import android.widget.Toast
import com.echo.holographlibrary.Line
import com.echo.holographlibrary.LineGraph
import com.echo.holographlibrary.LinePoint

import com.miempresa.myapplication.databinding.FragmentTelemetriaBinding


class Telemetria : Fragment() {

    private var _binding: FragmentTelemetriaBinding? = null
    private val binding get() = _binding!!
/*
    override fun onResume() {
        super.onResume()

    }

 */

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentTelemetriaBinding.inflate(inflater, container,false)

        val autos = resources.getStringArray(R.array.autos_usuario)
        val sensores = resources.getStringArray(R.array.autos_sensores)
        val arrayAdapter = ArrayAdapter(requireContext(), R.layout.autos_usuario, autos)
        val arrayAdapter2 = ArrayAdapter(requireContext(), R.layout.autos_usuario, sensores)
        binding.autoUsuario.setAdapter(arrayAdapter)
        binding.autoSensor.setAdapter(arrayAdapter2)

        binding.tvPuntos.text = "PUNTOS \n"

        var linea = Line()
        linea = datosGrafica(linea, 1.0, 1.0)
        linea = datosGrafica(linea, 2.0, 9.0)
        linea = datosGrafica(linea, 3.0, 3.0)
        linea = datosGrafica(linea, 4.0, 5.0)
        linea.color = Color.parseColor("#EABD63")

        graficar(linea)

        binding.lineGrafica.setOnPointClickedListener { lineIndex, pointIndex ->
            Toast.makeText(
                getActivity(),
                "Linea: $lineIndex, Punto: $pointIndex",
                Toast.LENGTH_LONG
            ).show()
        }

        val view = binding.root
        return view
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    fun datosGrafica(linea: Line, ejeX: Double, ejeY: Double): Line {
        val punto = LinePoint()
        punto.setX(ejeX)
        punto.setY(ejeY)
        linea.addPoint(punto)

        binding.tvPuntos.text = "${binding.tvPuntos.text}\nX: $ejeX, Y:$ejeY"

        return linea
    }

    fun graficar(linea: Line) {
        binding.lineGrafica.addLine(linea)
        binding.lineGrafica.setRangeX(1f, 4f)
        binding.lineGrafica.setRangeY(0f, 10f)
        binding.lineGrafica.lineToFill = 0
    }

}