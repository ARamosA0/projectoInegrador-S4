package com.miempresa.myapplication.ui.telemetria


import android.os.AsyncTask
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.Fragment
import com.android.volley.Response
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import com.miempresa.myapplication.ui.graficosFragments.GraficoTemperatura
import com.miempresa.myapplication.R
import com.miempresa.myapplication.databinding.FragmentTelemetriaBinding
import com.miempresa.myapplication.models.Temperatura
import com.miempresa.myapplication.ui.autohome.AutoHome
import com.miempresa.myapplication.ui.graficosFragments.GraficoVacio
import com.miempresa.myapplication.ui.graficosFragments.GraficoVoltaje
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

        val listaSensores = ArrayList<String>()
        var selectorSensor =  view.findViewById<AutoCompleteTextView>(R.id.autoSensor)
        //var pruebaT = view.findViewById<EditText>(R.id.prueba)

        AsyncTask.execute {
            val queue = Volley.newRequestQueue(getActivity() )
            val url = getString(R.string.urlAPI) + "/sensors/"
            val stringRequest = JsonArrayRequest(url,
                Response.Listener { response ->
                    try {
                        for (i in 0 until response.length()) {
                            val id =
                                response.getJSONObject(i).getString("id")
                            val ins_nombre =
                                response.getJSONObject(i).getString("ins_nombre")
                            listaSensores.add(ins_nombre)

                            val OpAdapter = ArrayAdapter(requireActivity(),android.R.layout.simple_spinner_dropdown_item, listaSensores)

                            var sensor = ""

                            selectorSensor.setAdapter(OpAdapter)

                        }
                    } catch (e: JSONException) {
                        alertFail("Error al obtener los datos")
                    }
                }, Response.ErrorListener {
                    alertFail("Error en la conexion")
                })
            queue.add(stringRequest)
        }

        replaceFragment(GraficoVacio())

        selectorSensor.setOnItemClickListener{ adapterView, view, i, l ->
            //var opSensor = adapterView.getItemAtPosition(i).toString()
            if (i == 0) {
                replaceFragment(GraficoTemperatura())
            }
            if (i == 1){
                replaceFragment(GraficoVoltaje())
            }
        }


        return view
    }

    private fun replaceFragment(fragment: Fragment) {
        val fragmentManager = getParentFragmentManager()
        val fragmentTransaction = fragmentManager.beginTransaction()
        fragmentTransaction.replace(R.id.contenedor_grafico, fragment).commit()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
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