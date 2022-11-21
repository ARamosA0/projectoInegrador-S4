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
        return view
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        var listaError = view.findViewById<RecyclerView>(R.id.listaErr)

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