package com.miempresa.myapplication

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.miempresa.myapplication.models.SensorData
import com.miempresa.myapplication.ui.telemetria.Telemetria

class AdaptadorSensores(val ListaSensores:ArrayList<SensorData>):
    RecyclerView.Adapter<AdaptadorSensores.ViewHolder>(){
    class ViewHolder(itemView: View): RecyclerView.ViewHolder(itemView){
        val fsensor_texto = itemView.findViewById<TextView>(R.id.elemento_sensores)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val v = LayoutInflater.from(parent?.context).inflate(R.layout.elemento_sensor, parent, false)
        return ViewHolder(v)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder?.fsensor_texto?.text=ListaSensores[position].ins_nombre

        holder.itemView.setOnClickListener {
            val valor: String = ListaSensores[position].ins_nombre
            val bundle = Bundle()
            bundle.putString("sensor", valor)
            val resultado = Telemetria()
            resultado.arguments = bundle
        }

    }

    override fun getItemCount(): Int {
        return ListaSensores.size
    }
}