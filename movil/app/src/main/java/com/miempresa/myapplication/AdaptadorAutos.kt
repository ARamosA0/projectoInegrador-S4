package com.miempresa.myapplication

import android.content.Intent
import android.os.AsyncTask
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.RecyclerView
import coil.load
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley

import com.miempresa.myapplication.models.AutoData
import com.miempresa.myapplication.ui.autohome.AutoHome
import org.json.JSONException
import org.json.JSONObject

class AdaptadorAutos(val ListaAutos:ArrayList<AutoData>):
RecyclerView.Adapter<AdaptadorAutos.ViewHolder>() {
    class ViewHolder(itemView: View):RecyclerView.ViewHolder(itemView) {
        val fImagen = itemView.findViewById<ImageView>(R.id.autoImagen);
        val fPlaca = itemView.findViewById<TextView>(R.id.autoPlaca)
        val fModelo = itemView.findViewById<TextView>(R.id.autoModelo)
        val fDescripcion = itemView.findViewById<TextView>(R.id.autoDescripcion)
        val fEditar = itemView.findViewById<ImageButton>(R.id.autoEditar)
        val fEliminar = itemView.findViewById<ImageButton>(R.id.autoDelete)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val v = LayoutInflater.from(parent?.context).inflate(R.layout.elemento_aut, parent, false);
        return ViewHolder(v);
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder?.fImagen?.load(ListaAutos[position].aut_imagen)
        holder?.fPlaca?.text=ListaAutos[position].aut_placa
        holder?.fModelo?.text=ListaAutos[position].aut_modelo
        holder?.fDescripcion?.text=ListaAutos[position].aut_descripcion
        var id = ListaAutos[position].id
        var marca = ListaAutos[position].aut_marca
        var imagen = ListaAutos[position].aut_imagen
        var modelo = ListaAutos[position].aut_modelo
        var placa = ListaAutos[position].aut_placa
        var color = ListaAutos[position].aut_color
        var fecAd = ListaAutos[position].aut_fecadquisicion
        var descripcion = ListaAutos[position].aut_descripcion

        holder.fEditar.setOnClickListener(){
            val llamaractividad = Intent(holder.itemView.context, AutoAdd::class.java)
            llamaractividad.putExtra("id",id.toString())
            llamaractividad.putExtra("marca",marca.toString())
            llamaractividad.putExtra("modelo",modelo.toString())
            llamaractividad.putExtra("placa",placa.toString())
            llamaractividad.putExtra("imagen",imagen.toString())
            llamaractividad.putExtra("color",color.toString())
            llamaractividad.putExtra("fecAd",fecAd.toString())
            llamaractividad.putExtra("descripcion",descripcion.toString())
            holder.itemView.context.startActivity(llamaractividad)
        }

        holder.fEliminar.setOnClickListener(){
           /* val fragment = AutoHome()
            val bundle = Bundle()
            bundle.putString("idvehiculo", id.toString())
            fragment.arguments = bundle
            supportFragmentManager.begin*/
        }
    }

    override fun getItemCount(): Int {
        return ListaAutos.size;
    }






}