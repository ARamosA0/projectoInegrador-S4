package com.miempresa.myapplication.ui.graficosFragments

import android.app.PendingIntent
import android.content.Intent
import android.os.AsyncTask
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AlertDialog
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.android.volley.Response
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import com.github.mikephil.charting.charts.LineChart
import com.github.mikephil.charting.components.AxisBase
import com.github.mikephil.charting.components.XAxis
import com.github.mikephil.charting.data.Entry
import com.github.mikephil.charting.data.LineData
import com.github.mikephil.charting.data.LineDataSet
import com.github.mikephil.charting.formatter.IndexAxisValueFormatter
import com.miempresa.myapplication.R
import com.miempresa.myapplication.RegisterActivity
import com.miempresa.myapplication.models.Voltaje
import org.json.JSONException


class GraficoVoltaje : Fragment() {

    private var scoreList = ArrayList<Voltaje>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view: View = inflater.inflate(R.layout.fragment_grafico_voltaje, container, false)
        val graph = view.findViewById(R.id.graphVol) as LineChart

        val swipe = view.findViewById<SwipeRefreshLayout>(R.id.swipeGraphVolta)
        swipe.setColorSchemeResources(R.color.purple_200)

        AsyncTask.execute {
            swipeconfig(swipe)
            val queue = Volley.newRequestQueue(getActivity())
            val url = getString(R.string.urlAPI) + "/datasensors/2"
            val graphRequest = JsonArrayRequest(url,
                Response.Listener { response ->
                    try {
                        for (i in 15 until response.length()) {
                            val id =
                                response.getJSONObject(i).getInt("id")
                            val rda_fecha =
                                response.getJSONObject(i).getString("rda_fecha")
                            val rda_hora =
                                response.getJSONObject(i).getString("rda_hora")
                            val rda_valor =
                                response.getJSONObject(i).getString("rda_valor").toDouble()
                            val ixa =
                                response.getJSONObject(i).getInt("ixa")
                            scoreList.add(Voltaje(rda_fecha, rda_valor))
                            if(rda_valor > 5.00){
                                val CHANNEL_ID = "com.miempresa.myapplication"
                                val intent = Intent(getActivity(), RegisterActivity::class.java).apply {
                                    flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                                }
                                val pendingIntent: PendingIntent = PendingIntent.getActivity(getActivity(), 0, intent, PendingIntent.FLAG_IMMUTABLE)
                                val builder = getActivity()?.let {
                                    NotificationCompat.Builder(it, CHANNEL_ID)
                                        .setSmallIcon(R.drawable.ic_baseline_directions_car_24)
                                        .setContentTitle("ALERTA DE SENSOR")
                                        .setContentText("Voltaje mayor a 5V detectada!")
                                        .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                                        // Set the intent that will fire when the user taps the notification
                                        //.setContentIntent(pendingIntent)
                                        .setAutoCancel(true)
                                }

                                with(getActivity()?.let { NotificationManagerCompat.from(it) }) {
                                    // notificationId is a unique int for each notification that you must define
                                    builder?.let { this?.notify(1, it.build()) }
                                }
                            }
                        }

                        //setValueXLineChart(graph)
                        initLineChart(graph)

                        setDataToLineChart(graph)

                        alertFail("Okey... Si se logró")

                        swipeEnd(swipe)

                    } catch (e: JSONException) {
                        alertFail("Error al obtener los datos")
                    }
                }, Response.ErrorListener {
                    alertFail("No eres tu, soy yo. No podemos obtener los datos")
                })
            queue.add(graphRequest)
        }



        return view
    }

    private fun initLineChart(graph: LineChart) {

        val xAxis: XAxis = graph.xAxis
        xAxis.setDrawGridLines(false)
        xAxis.setDrawAxisLine(false)

        // to draw label on xAxis
        xAxis.position = XAxis.XAxisPosition.BOTTOM
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
        graph.setNoDataText("Ya casi, danos un segundo...")
        graph.invalidate()
    }


    private fun getScoreList(): ArrayList<Voltaje> {
        return scoreList
    }


    private fun swipeconfig(swipe: SwipeRefreshLayout) {
        swipe.isEnabled = true
        swipe.isRefreshing = true
    }

    private fun swipeEnd(swipe: SwipeRefreshLayout) {
        swipe.isRefreshing = false
        swipe.isEnabled = false
    }

    private fun alertFail(s: String) {
        val alertDialogBuilder = getActivity()?.let {
            AlertDialog.Builder(it)
                .setTitle("Ups! Algo salió mal")
                .setMessage(s)
                .setPositiveButton("OK", { dialog, whichButton ->
                    dialog.dismiss()
                })
                .show()
        }
    }


}