package com.miempresa.myapplication.ui.historial


import android.content.Intent
import android.os.AsyncTask
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AlertDialog
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.android.volley.Response
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import com.miempresa.myapplication.AdaptadorErrores
import com.miempresa.myapplication.ErrorAdd
import com.miempresa.myapplication.R
import com.miempresa.myapplication.models.ErroresData
import org.json.JSONException


class Historial : Fragment() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view: View = inflater.inflate(R.layout.fragment_historial, container, false)

        var btnAddErr = view.findViewById<com.google.android.material.floatingactionbutton.FloatingActionButton>(R.id.errAdd)
        btnAddErr.setOnClickListener{
            val intent = Intent (this@Historial.requireContext(), ErrorAdd::class.java)
            startActivity(intent)
        }
        return view
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        var listaError = view.findViewById<RecyclerView>(R.id.listaErr)
        listaError.addItemDecoration(DividerItemDecoration(getActivity(), DividerItemDecoration.VERTICAL))
        listaError.layoutManager = LinearLayoutManager(getActivity())
        var llenarLista = ArrayList<ErroresData>()
        AsyncTask.execute {
            val queue = Volley.newRequestQueue(getActivity() )
            val url = getString(R.string.urlAPI) + "/errmanual/"
            val stringRequest = JsonArrayRequest(url,
                Response.Listener { response ->
                    try {
                        for (i in 0 until response.length()) {
                            val auto =
                                response.getJSONObject(i).getString("auto")
                            val id =
                                response.getJSONObject(i).getString("id")
                            val rma_descripcion =
                                response.getJSONObject(i).getString("rma_descripcion")
                            val rma_fecha =
                                response.getJSONObject(i).getString("rma_fecha")
                            val rma_fecmodificacion =
                                response.getJSONObject(i).getString("rma_fecmodificacion")
                            val rma_fecregistro =
                                response.getJSONObject(i).getString("rma_fecregistro")
                            val rma_hora =
                                response.getJSONObject(i).getString("rma_hora")
                            val rma_nombre =
                                response.getJSONObject(i).getString("rma_nombre")
                            llenarLista.add(ErroresData(
                                auto.toInt(), id.toInt(), rma_descripcion, rma_fecha, rma_fecmodificacion, rma_fecregistro, rma_hora, rma_nombre))
                        }
                        val adapter = AdaptadorErrores(llenarLista)
                        listaError.adapter = adapter


                    } catch (e: JSONException) {
                        alertFail("Error al obtener los datos")
                    }
                }, Response.ErrorListener {
                    alertFail("Error en la conexion")
                })
            queue.add(stringRequest)
        }
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