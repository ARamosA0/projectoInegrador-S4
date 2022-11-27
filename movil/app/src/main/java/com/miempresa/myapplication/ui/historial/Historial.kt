package com.miempresa.myapplication.ui.historial


import android.content.Intent
import android.os.AsyncTask
import android.os.Bundle
import android.os.Handler
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ProgressBar
import android.widget.TextView
import androidx.appcompat.app.AlertDialog
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.android.volley.Response
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import com.miempresa.myapplication.*
import com.miempresa.myapplication.models.AutoData
import com.miempresa.myapplication.models.ErroresData
import com.miempresa.myapplication.models.SensorErrorData
import org.json.JSONException


class Historial : Fragment() {

    private val handler = Handler()
    private var i = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view: View = inflater.inflate(R.layout.fragment_historial, container, false)
        return view
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)


        val progressBar = view.findViewById<ProgressBar>(R.id.progress_Bar)
        var txtView = view.findViewById<TextView>(R.id.text_view)

        Thread(Runnable {
            i = progressBar.progress
            // this loop will run until the value of i becomes 99
            while (i < 100) {
                i += 1
                // Update the progress bar and display the current value
                handler.post(Runnable {
                    progressBar.progress = i
                    // setting current progress to the textview
                    txtView!!.text = i.toString() + "/" + progressBar.max
                })
                try {
                    Thread.sleep(100)
                } catch (e: InterruptedException) {
                    e.printStackTrace()
                }
            }

            // setting the visibility of the progressbar to invisible
            // or you can use View.GONE instead of invisible
            // View.GONE will remove the progressbar

        }).start()


        var listarSenErr = view.findViewById<RecyclerView>(R.id.listaSenErr)
        listarSenErr.addItemDecoration(
            DividerItemDecoration(
                getActivity(),
                DividerItemDecoration.VERTICAL
            )
        )
        listarSenErr.layoutManager = LinearLayoutManager(getActivity())
        var llenarLista = ArrayList<SensorErrorData>()
        AsyncTask.execute {

            val queue = Volley.newRequestQueue(getActivity())
            val url = getString(R.string.urlAPI) + "/errsensor/"
            val stringRequest = JsonArrayRequest(url,
                Response.Listener { response ->
                    try {
                        for (i in 0 until response.length()) {
                            val id =
                                response.getJSONObject(i).getString("id")
                            val nombre =
                                response.getJSONObject(i).getString("rer_nombre")
                            val descripcion =
                                response.getJSONObject(i).getString("rer_descripcion")
                            val fecregistro =
                                response.getJSONObject(i).getString("rer_fecregistro")
                            val datoregistrado =
                                response.getJSONObject(i).getString("registro_datos")
                            llenarLista.add(
                                SensorErrorData(id.toInt(), nombre, descripcion, fecregistro,datoregistrado.toInt())
                            )
                        }
                        val adapter = AdaptadorSensorError(llenarLista)
                        listarSenErr.adapter = adapter


                    } catch (e: JSONException) {
                        alertFail("Error al obtener los datos")
                    }
                }, Response.ErrorListener {
                    alertFail("Error en la conexion")
                })
            queue.add(stringRequest)
        }
        progressBar.visibility = View.INVISIBLE

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