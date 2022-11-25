package com.miempresa.myapplication.ui.telemetria

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import com.miempresa.myapplication.R
import android.graphics.Color
import android.os.AsyncTask
import android.widget.AutoCompleteTextView
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import com.android.volley.Response
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import com.echo.holographlibrary.Line
import com.echo.holographlibrary.LineGraph
import com.echo.holographlibrary.LinePoint
import com.miempresa.myapplication.AdaptadorErrores

import com.miempresa.myapplication.databinding.FragmentTelemetriaBinding
import com.miempresa.myapplication.models.ErroresData
import com.miempresa.myapplication.models.SensorData
import kotlinx.android.synthetic.main.fragment_telemetria.*
import org.json.JSONException


class Telemetria : Fragment() {

    private var _binding: FragmentTelemetriaBinding? = null
    private val binding get() = _binding!!


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view: View = inflater.inflate(R.layout.fragment_telemetria, container, false)
        /*
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

         */

        val listaSensores = ArrayList<SensorData>()
        var selectorSensor =  view.findViewById<AutoCompleteTextView>(R.id.autoSensor)

        AsyncTask.execute {
            val queue = Volley.newRequestQueue(getActivity() )
            val url = getString(R.string.urlAPI) + "/sensors/"
            val stringRequest = JsonArrayRequest(url,
                Response.Listener { response ->
                    try {
                        for (i in 0 until response.length()) {
                            val id =
                                response.getJSONObject(i).getString("id")
                            val ins_codigo =
                                response.getJSONObject(i).getString("ins_codigo")
                            val ins_nombre =
                                response.getJSONObject(i).getString("ins_nombre")
                            val ins_unidad =
                                response.getJSONObject(i).getString("ins_unidad")
                            listaSensores.add(SensorData(id.toInt(),ins_codigo,ins_nombre,ins_unidad))
                            val OpAdapter = ArrayAdapter(requireActivity(),android.R.layout.simple_spinner_dropdown_item, listaSensores)
                            var sensor = ""

                            selectorSensor.setAdapter(OpAdapter)
                            selectorSensor.setOnItemClickListener{ adapterView, view, i, l ->
                                sensor = adapterView.getItemAtPosition(i).toString()
                            }

                            pruebaText.text = sensor
                        }
                    } catch (e: JSONException) {
                        alertFail("Error al obtener los datos")
                    }
                }, Response.ErrorListener {
                    alertFail("Error en la conexion")
                })
            queue.add(stringRequest)
        }
/*
        val OpAdapter = ArrayAdapter(requireActivity(),android.R.layout.simple_spinner_dropdown_item, listaSensores)
        var sensor = ""

        selectorSensor.setAdapter(OpAdapter)
        selectorSensor.setOnItemClickListener{ adapterView, view, i, l ->
            sensor = adapterView.getItemAtPosition(i).toString()
        }

        pruebaText.text = sensor


         */

        return view
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
    /*

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



     */
    private fun alertFail(s: String) {
        val alertDialogBuilder = getActivity()?.let {
            AlertDialog.Builder(it)
                .setTitle("Error")
                .setIcon(R.drawable.ic_baseline_warning_24)
                .setMessage(s)
                .setPositiveButton("OK", { dialog, whichButton ->
                    dialog.dismiss()
                })
                .show()
        }
    }

}