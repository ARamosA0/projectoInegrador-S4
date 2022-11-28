package com.miempresa.myapplication.ui.autohome

import android.content.Context
import android.content.Intent
import android.os.AsyncTask
import android.os.Bundle
import android.view.*
import android.widget.*
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.*
import coil.load
import com.android.volley.Response
import com.android.volley.toolbox.*
import com.miempresa.myapplication.*
import com.miempresa.myapplication.databinding.FragmentTelemetriaBinding
import com.miempresa.myapplication.models.AutoData
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

        val btnCerrar = view.findViewById<ImageButton>(R.id.btn_cerrarsesion)
        registerForContextMenu(btnCerrar)

        registerForContextMenu(btnCerrar)




        return view
    }

    override fun onCreateContextMenu(
        menu: ContextMenu,
        v: View,
        menuInfo: ContextMenu.ContextMenuInfo?
    ) {
        super.onCreateContextMenu(menu, v, menuInfo)
        requireActivity().menuInflater.inflate(R.menu.usuario_menu, menu)
    }

    override fun onContextItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.cerrar_sesion -> {
                login()
            }
        }
        return true
    }

        override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
            super.onViewCreated(view, savedInstanceState)
            //datos de usuario

            var NameText = view.findViewById<TextView>(R.id.userName)
            var UserImage = view.findViewById<ImageView>(R.id.userImage)

            val datos = getActivity()?.getSharedPreferences("DatosUsuario", Context.MODE_PRIVATE)
            val userId = datos?.getString("id", "id de usuario").toString()
            val userName = datos?.getString("user_name", "Nombre de usuario").toString()
            val userImage = datos?.getString("user_imagen", "Imagen del usuario").toString()
            NameText.text = userName
            UserImage.load(userImage)


            var listaAut = view.findViewById<RecyclerView>(R.id.lista)
            listaAut.addItemDecoration(
                DividerItemDecoration(
                    getActivity(),
                    DividerItemDecoration.VERTICAL
                )
            )
            listaAut.layoutManager = LinearLayoutManager(getActivity())
            var llenarLista = ArrayList<AutoData>()
            AsyncTask.execute {
                val queue = Volley.newRequestQueue(getActivity())
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
                                llenarLista.add(
                                    AutoData(
                                        id.toInt(),
                                        color,
                                        descripcion,
                                        fecAd,
                                        imagen,
                                        marca,
                                        modelo,
                                        placa,
                                        usuario.toInt()
                                    )
                                )
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
                    .setMessage(s)
                    .setPositiveButton("OK", { dialog, whichButton ->
                        dialog.dismiss()
                    })
                    .show()
            }
        }


        private fun login() {
            val cerrar = Intent (this@AutoHome.requireContext(), LoginActivity::class.java)
            startActivity(cerrar)
        }

}





