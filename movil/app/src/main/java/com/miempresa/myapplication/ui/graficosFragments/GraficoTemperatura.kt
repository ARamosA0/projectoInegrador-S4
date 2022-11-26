package com.miempresa.myapplication.ui.graficosFragments

import android.graphics.Color
import android.os.AsyncTask
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import androidx.appcompat.app.AlertDialog
import com.android.volley.Response
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import com.jjoe64.graphview.GraphView
import com.jjoe64.graphview.LegendRenderer
import com.jjoe64.graphview.series.DataPoint
import com.jjoe64.graphview.series.LineGraphSeries
import com.miempresa.myapplication.R
import org.json.JSONException

class GraficoTemperatura : Fragment() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view: View = inflater.inflate(R.layout.fragment_grafico_temperatura, container, false)

        val horaTemperatura = ArrayList<Any>()
        val valorTemperatura = ArrayList<Any>()

        AsyncTask.execute {
            val queue = Volley.newRequestQueue(getActivity() )
            val url = getString(R.string.urlAPI) + "/datasensors/"
            val stringRequest = JsonArrayRequest(url,
                Response.Listener { response ->
                    try {
                        for (i in 0 until response.length()) {
                            val rda_hora =
                                response.getJSONObject(i).getString("rda_hora")
                            val rda_valor =
                                response.getJSONObject(i).getString("rda_valor")
                            horaTemperatura.add(rda_hora)
                            valorTemperatura.add(rda_valor)

                        }
                        alertFail("Siiiiii")
                    } catch (e: JSONException) {
                        alertFail("Error al obtener los datos")
                    }
                }, Response.ErrorListener {
                    alertFail("Error en la conexion")
                })
            queue.add(stringRequest)
        }

        val graph = view.findViewById(R.id.grafico) as GraphView
        val series: LineGraphSeries<DataPoint> = LineGraphSeries(
            arrayOf(
                DataPoint(0.0, 1.0),
            )
        )

        series.apply {
            setTitle("Temperatura");
            setColor(Color.rgb(247,58,58));
            setDrawDataPoints(true);
            setDataPointsRadius(6F);
        }

        graph.addSeries(series)

        //graph.getLegendRenderer().setVisible(true);
        //graph.getLegendRenderer().setAlign(LegendRenderer.LegendAlign.TOP);
        return view
    }


    private fun alertFail(s: String) {
        val alertDialogBuilder = getActivity()?.let {
            AlertDialog.Builder(it)
                .setTitle("Error")
                .setMessage(s)
                .setPositiveButton("OK", { dialog, whichButton ->
                    dialog.dismiss()
                })
                .show()
        }
    }


}