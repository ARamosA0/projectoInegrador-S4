package com.miempresa.myapplication.ui.historial


import android.os.AsyncTask
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.appcompat.app.AlertDialog
import androidx.core.widget.addTextChangedListener
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.android.volley.Response
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import com.miempresa.myapplication.*
import com.miempresa.myapplication.models.SensorErrorData
import kotlinx.android.synthetic.main.fragment_historial.*
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

        return view
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)


        val swipe = view.findViewById<SwipeRefreshLayout>(R.id.swipeSensError)
        swipe.setColorSchemeResources(R.color.purple_200)
        swipe.isRefreshing = false

        var listarSenErr = view.findViewById<RecyclerView>(R.id.listaSenErr)
        listarSenErr.addItemDecoration(
            DividerItemDecoration(
                getActivity(),
                DividerItemDecoration.VERTICAL
            )
        )
        listarSenErr.layoutManager = LinearLayoutManager(getActivity())
        var llenarLista = ArrayList<SensorErrorData>()
        val adapter = AdaptadorSensorError(llenarLista)

        //Selecciona Hora
        val listaHora = ArrayList<String>()
        var selectorHora = view.findViewById<AutoCompleteTextView>(R.id.errHorafil)

        //Selecciona Fecha
        val listaFecha = ArrayList<String>()
        var selectorFecha = view.findViewById<AutoCompleteTextView>(R.id.errFecfil)

        //EditFilter
        var errFilter = view.findViewById<EditText>(R.id.errHoraFilter)
        errFilter.addTextChangedListener{ errorFilter ->
            val llenarlistaFiltrado = llenarLista.filter { error -> error.rer_horaregistro.lowercase().contains(errorFilter.toString().lowercase()) }
            adapter.updateErrorList(llenarlistaFiltrado as ArrayList<SensorErrorData>)
        }

        //EditFecFilter
        var errFecFilter = view.findViewById<EditText>(R.id.errFechaFilter)
        errFecFilter.addTextChangedListener{ errorFilter ->
            val llenarlistaFiltrado = llenarLista.filter { error -> error.rer_fecregistro.lowercase().contains(errorFilter.toString().lowercase()) }
            adapter.updateErrorList(llenarlistaFiltrado as ArrayList<SensorErrorData>)
        }

        //Peticion de errores
        AsyncTask.execute {
            swipeconfig(swipe)
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
                            val horaregistro =
                                response.getJSONObject(i).getString("rer_horaregistro")
                            val datoregistrado =
                                response.getJSONObject(i).getString("registro_datos")

                            val split = horaregistro.split(".").toTypedArray()
                            val horaCompleta = split[0]


                            llenarLista.add(
                                SensorErrorData(id.toInt(), nombre, descripcion, fecregistro, horaCompleta,datoregistrado.toInt())
                            )
                            //
                            listaHora.add(horaCompleta)
                            val OpAdapter = ArrayAdapter(requireActivity(),android.R.layout.simple_spinner_dropdown_item, listaHora)

                            listaFecha.add(fecregistro)
                            val OpAdapterFec = ArrayAdapter(requireActivity(),android.R.layout.simple_spinner_dropdown_item, listaFecha)

                            selectorHora.setAdapter(OpAdapter)
                            selectorHora.setOnItemClickListener { adapterView, view, i, l ->
                                var hora = adapterView.getItemAtPosition(i).toString()
                                errHoraFilter.setText(hora)
                            }

                            selectorFecha.setAdapter(OpAdapterFec)
                            selectorFecha.setOnItemClickListener { adapterView, view, i, l ->
                                var fecha = adapterView.getItemAtPosition(i).toString()
                                errFechaFilter.setText(fecha)
                            }

                        }
                        listarSenErr.adapter = adapter
                        swipeEnd(swipe)


                    } catch (e: JSONException) {
                        alertFail("Error al obtener los datos")
                    }
                }, Response.ErrorListener {
                    alertFail("Intenta ingresar mas tarde o revisa tu conexión a internet")
                })
            queue.add(stringRequest)
        }

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