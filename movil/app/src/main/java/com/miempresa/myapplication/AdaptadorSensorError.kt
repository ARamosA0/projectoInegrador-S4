package com.miempresa.myapplication

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Filter
import android.widget.Filterable
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.miempresa.myapplication.models.SensorErrorData
import java.util.*
import kotlin.collections.ArrayList

class AdaptadorSensorError(var ListaSensoresError:ArrayList<SensorErrorData>): RecyclerView.Adapter<AdaptadorSensorError.ViewHolder>(){


    class ViewHolder(itemView: View):RecyclerView.ViewHolder(itemView) {
        val fsenNombre = itemView.findViewById<TextView>(R.id.senerrNombre);
        val fsenDescrip = itemView.findViewById<TextView>(R.id.senerrDescripcion)
        val fsenFecha = itemView.findViewById<TextView>(R.id.senerrfecha)
        val fsenHora = itemView.findViewById<TextView>(R.id.senerrhora)
        val fsenDatoReg = itemView.findViewById<TextView>(R.id.senerrDatoregistrado)

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val v = LayoutInflater.from(parent?.context).inflate(R.layout.elemento_sensorerror, parent, false);
        return ViewHolder(v);
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder?.fsenNombre?.text=ListaSensoresError[position].rer_nombre
        holder?.fsenDescrip?.text=ListaSensoresError[position].rer_descripcion
        holder?.fsenFecha?.text=ListaSensoresError[position].rer_fecregistro
        holder?.fsenHora?.text=ListaSensoresError[position].rer_horaregistro
        holder?.fsenDatoReg?.text= "Dato registrado: " + ListaSensoresError[position].registro_datos.toString()
    }

    override fun getItemCount(): Int {
        return ListaSensoresError.size;
    }

    fun updateErrorList(ListaSensoresError:ArrayList<SensorErrorData>){
        this.ListaSensoresError = ListaSensoresError
        notifyDataSetChanged()
    }
}