package com.miempresa.googlemapv4

import android.os.Build
import android.os.Bundle
import android.view.View
import android.widget.AdapterView
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.Marker
import com.google.android.gms.maps.model.MarkerOptions
import com.miempresa.myapplication.R
import com.miempresa.myapplication.databinding.ActivityMapsBinding


class MapsActivity : AppCompatActivity(), OnMapReadyCallback,
    GoogleMap.OnMarkerClickListener,
    AdapterView.OnItemSelectedListener {



    private lateinit var mMap: GoogleMap
    var marcadorDestino: Marker? = null
    lateinit var binding: ActivityMapsBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_maps)

        val mapFragment = supportFragmentManager
            .findFragmentById(R.id.map) as SupportMapFragment
        mapFragment.getMapAsync(this)
    }

    @RequiresApi(Build.VERSION_CODES.M)
    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap

        // Add a marker in Sydney and move the camera
        val sydney = LatLng(-16.3948034,-71.5547986)
        mMap.addMarker(
            MarkerOptions()
                .position(sydney)
                .title("Taller cercano")
        )
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(sydney, 15f))
        mMap.setOnMarkerClickListener(this)
    }


    override fun onMarkerClick(p0: Marker): Boolean {
        TODO("Not yet implemented")
    }

    override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
        TODO("Not yet implemented")
    }

    override fun onNothingSelected(parent: AdapterView<*>?) {
        TODO("Not yet implemented")
    }
}
