package com.miempresa.myapplication.ui.graficosFragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.Fragment
import com.github.mikephil.charting.charts.LineChart
import com.github.mikephil.charting.components.AxisBase
import com.github.mikephil.charting.components.XAxis
import com.github.mikephil.charting.data.*
import com.github.mikephil.charting.formatter.IndexAxisValueFormatter
import com.miempresa.myapplication.R
import com.miempresa.myapplication.models.Temperatura
import kotlin.collections.ArrayList

class GraficoTemperatura : Fragment() {

    private var scoreList = ArrayList<Temperatura>()


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view: View = inflater.inflate(R.layout.fragment_grafico_temperatura, container, false)


        /*
        AsyncTask.execute {
            val queue = Volley.newRequestQueue(getActivity() )
            val url = getString(R.string.urlAPI) + "/datasensors/1"
            val stringRequest = JsonArrayRequest(url,
                Response.Listener { response ->
                    try {
                        for (i in 0 until response.length()) {
                            val id =
                                response.getJSONObject(i).getString("id")
                            val rda_fecha =
                                response.getJSONObject(i).getString("rda_fecha")
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

         */

        val graph = view.findViewById(R.id.graphTemp) as LineChart
        //setValueXLineChart(graph)
        initLineChart(graph)

        setDataToLineChart(graph)

        return view
    }



    private fun initLineChart(graph: LineChart) {

        val xAxis: XAxis = graph.xAxis
        xAxis.setDrawGridLines(false)
        xAxis.setDrawAxisLine(false)

        // to draw label on xAxis
        xAxis.position = XAxis.XAxisPosition.BOTTOM_INSIDE
        xAxis.valueFormatter = MyAxisFormatter()
        xAxis.setDrawLabels(true)
        xAxis.granularity = 1f
        //xAxis.labelRotationAngle = +90f

    }

    inner class MyAxisFormatter : IndexAxisValueFormatter() {

        override fun getAxisLabel(value: Float, axis: AxisBase?): String {
            val index = value.toInt()
            return if (index < scoreList.size) {
                scoreList[index].name
            } else {
                ""
            }
        }
    }

    private fun setDataToLineChart(graph: LineChart) {
        //now draw bar chart with dynamic data
        val entries: ArrayList<Entry> = ArrayList()

        scoreList = getScoreList()

        //you can replace this data object with  your custom object
        for (i in scoreList.indices) {
            val score = scoreList[i]
            entries.add(Entry(i.toFloat(), score.score.toFloat()))
        }

        val lineDataSet = LineDataSet(entries, "")
        lineDataSet.color = resources.getColor(R.color.purple_200)
        lineDataSet.valueTextColor = resources.getColor(R.color.gris_oscuro)

        val data = LineData(lineDataSet)
        graph.data = data
        graph.animateX(1500)
        graph.description.text = ""
        graph.invalidate()
    }

    private fun getScoreList(): ArrayList<Temperatura> {
        scoreList.add(Temperatura("John", 56.87))
        scoreList.add(Temperatura("Rey", 75.00))
        scoreList.add(Temperatura("Steve", 85.8))
        scoreList.add(Temperatura("Kevin", 45.89))
        scoreList.add(Temperatura("Jeff", 63.78))

        return scoreList
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

    fun setValueXLineChart(graph: LineChart) {

        val xValue:ArrayList<String> = ArrayList()
        xValue.add("Mayo")
        xValue.add("Junio")
        xValue.add("Julio")
        xValue.add("Agosto")
        xValue.add("Septiembre")

        val lineEntry = ArrayList<Entry>()
        lineEntry.add(Entry(10f,100f))
        lineEntry.add(Entry(20f,200f))
        lineEntry.add(Entry(30f,300f))
        lineEntry.add(Entry(40f,400f))

        val linedataSet = LineDataSet(lineEntry, "First")


        val data = LineData(linedataSet)
        graph.data = data

    }
}