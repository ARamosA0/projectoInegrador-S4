package com.miempresa.myapplication.ui.autohome

import android.content.Context
import android.content.Intent
import android.os.AsyncTask
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

import android.widget.*
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.*
import com.android.volley.Response
import com.android.volley.toolbox.*
import androidx.fragment.app.FragmentTransaction
import android.widget.TextView
import androidx.appcompat.app.AlertDialog
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import coil.load
import com.android.volley.Request
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import com.miempresa.myapplication.AdaptadorAutos
import com.miempresa.myapplication.AutoAdd
import com.miempresa.myapplication.R
import com.miempresa.myapplication.databinding.FragmentTelemetriaBinding
import com.miempresa.myapplication.models.AutoData
import kotlinx.android.synthetic.main.fragment_auto_home.*
import org.json.JSONException


class AutoHome : Fragment() {

    private var _binding: FragmentTelemetriaBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view: View = inflater.inflate(R.layout.fragment_auto_home, container, false)

        var btnAgregarAuto = view.findViewById<com.google.android.material.floatingactionbutton.FloatingActionButton>(R.id.autoAdd)
        btnAgregarAuto.setOnClickListener{
            val intent = Intent (this@AutoHome.requireContext(), AutoAdd::class.java)
            startActivity(intent)
        }
        return view
    }


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        //datos de usuario

        var NameText = view.findViewById<TextView>(R.id.userName)
        var UserImage = view.findViewById<ImageView>(R.id.userImage)

        val datos = getActivity()?.getSharedPreferences("DatosUsuario", Context.MODE_PRIVATE)
        val userId = datos?.getString("id", "id de usuario").toString()
        val userName = datos?.getString("user_name", "Nombre de usuario").toString()
        val userImage = datos?.getString("user_imagen","Imagen del usuario").toString()
        NameText.text=userName
        UserImage.load(userImage)

        //Obtengo el id del vehiculo
        val data = arguments
        val idvehiculo = data?.get("idvehiculo")
        if(data!=null){
            eliminarVehiculo(idvehiculo.toString())
        }

        var listaAut = view.findViewById<RecyclerView>(R.id.lista)
        listaAut.addItemDecoration(DividerItemDecoration(getActivity(), DividerItemDecoration.VERTICAL))
        listaAut.layoutManager = LinearLayoutManager(getActivity())
        var llenarLista = ArrayList<AutoData>()
        AsyncTask.execute {
            val queue = Volley.newRequestQueue(getActivity() )
            val url = getString(R.string.urlAPI) + "/auto/" + userId
            val stringRequest = JsonArrayRequest(url,
                Response.Listener { response ->
                    try {
                        for (i in 0 until response.length()) {
                            val id =
                                response.getJSONObject(i).getString("id")
                            val imagen =
                                response.getJSONObject(i).getString("aut_imagen")
                            val placa =
                                response.getJSONObject(i).getString("aut_placa")
                            val modelo =
                                response.getJSONObject(i).getString("aut_modelo")
                            val descripcion =
                                response.getJSONObject(i).getString("aut_descripcion")
                            val marca =
                                response.getJSONObject(i).getString("aut_marca")
                            val color =
                                response.getJSONObject(i).getString("aut_color")
                            val fecAd =
                                response.getJSONObject(i).getString("aut_fecadquisicion")
                            val usuario =
                                response.getJSONObject(i).getString("aut_usuario")
                            llenarLista.add(AutoData(id.toInt(),imagen,placa, modelo, descripcion, marca, color, fecAd, usuario.toInt()))
                        }
                        val adapter = AdaptadorAutos(llenarLista)
                        listaAut.adapter = adapter


                    } catch (e: JSONException) {
                        alertFail("Error al obtener los datos")
                    }
                }, Response.ErrorListener {
                    alertFail("Error en la conexion")
                })
            queue.add(stringRequest)
        }
    }

    private fun alertSuccess(s: String) {
        val alertDialogBuilder = getActivity()?.let {
            AlertDialog.Builder(it)
                .setTitle("Felicidades")
                .setIcon(R.drawable.ic_baseline_check_24)
                .setMessage(s)
                .setPositiveButton("OK", { dialog, whichButton ->
                    dialog.dismiss()
                })
                .show()
        }
    }

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

    fun eliminarVehiculo(id:String) {
        AsyncTask.execute {
            val queue = Volley.newRequestQueue(getActivity())
            var url = getString(R.string.urlAPI) + "/vehicles/" + id
            val postRequest: StringRequest = object : StringRequest(
                Request.Method.DELETE, url,
                Response.Listener { response -> // response

                },
                Response.ErrorListener { response ->// error

                }
            ){}
            queue.add(postRequest)
        }
    }


}



