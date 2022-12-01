package com.miempresa.myapplication

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.miempresa.myapplication.models.ErroresData

class AdaptadorErrores (val ListaErrores:ArrayList<ErroresData>): RecyclerView.Adapter<AdaptadorErrores.ViewHolder>() {
    class ViewHolder (itemView: View):RecyclerView.ViewHolder(itemView){
        val ferr_nombre = itemView.findViewById<TextView>(R.id.errNombre);
        val ferr_descripcion = itemView.findViewById<TextView>(R.id.errDescripcion);
        val ferr_fecha = itemView.findViewById<TextView>(R.id.errFecha);
        val ferr_hora = itemView.findViewById<TextView>(R.id.errHora);

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val e = LayoutInflater.from(parent?.context).inflate(R.layout.elemento_erro, parent, false);
        return AdaptadorErrores.ViewHolder(e);
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder?.ferr_nombre?.text=ListaErrores[position].rma_nombre
        holder?.ferr_descripcion?.text=ListaErrores[position].rma_descripcion
        holder?.ferr_fecha?.text=ListaErrores[position].rma_fecha
        holder?.ferr_hora?.text=ListaErrores[position].rma_hora
    }

    override fun getItemCount(): Int {
        return ListaErrores.size;
    }

}