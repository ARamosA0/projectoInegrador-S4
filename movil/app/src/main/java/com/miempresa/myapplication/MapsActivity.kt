package com.miempresa.myapplication

<<<<<<< HEAD
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

=======
import android.os.Build
import android.os.Bundle
import android.view.View
import android.widget.AdapterView
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
>>>>>>> 0c5ca0b0e102fe266166042a918f25ed8b1d2ce4
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.LatLng
<<<<<<< HEAD
import com.google.android.gms.maps.model.MarkerOptions
import com.miempresa.myapplication.databinding.ActivityMapsBinding
import kotlinx.android.synthetic.main.activity_maps.*
=======
import com.google.android.gms.maps.model.Marker
import com.google.android.gms.maps.model.MarkerOptions
import com.miempresa.myapplication.R
import com.miempresa.myapplication.databinding.ActivityMapsBinding


class MapsActivity : AppCompatActivity(), OnMapReadyCallback,
    GoogleMap.OnMarkerClickListener,
    AdapterView.OnItemSelectedListener {
>>>>>>> 0c5ca0b0e102fe266166042a918f25ed8b1d2ce4

class MapsActivity : AppCompatActivity(), OnMapReadyCallback {


    private lateinit var mMap: GoogleMap
<<<<<<< HEAD
    private lateinit var binding: ActivityMapsBinding
=======
    var marcadorDestino: Marker? = null
    lateinit var binding: ActivityMapsBinding
>>>>>>> 0c5ca0b0e102fe266166042a918f25ed8b1d2ce4

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_maps)

<<<<<<< HEAD
        binding = ActivityMapsBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
=======
>>>>>>> 0c5ca0b0e102fe266166042a918f25ed8b1d2ce4
        val mapFragment = supportFragmentManager
            .findFragmentById(R.id.map) as SupportMapFragment
        mapFragment.getMapAsync(this)
    }

<<<<<<< HEAD
    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */
    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap

        // Add a marker in Sydney and move the camera
        val sydney = LatLng(-16.4131105,-71.5419388)
        mMap.addMarker(MarkerOptions().position(sydney).title("Marker in Sydney"))
        mMap.moveCamera(CameraUpdateFactory.newLatLng(sydney))
        createMarker()
=======
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
>>>>>>> 0c5ca0b0e102fe266166042a918f25ed8b1d2ce4
    }
    private fun createMarker(){
        val  coordinates= LatLng(-16.4131105,-71.5419388)
        val marker = MarkerOptions().position(coordinates).title("Mi taller de auto favorito!")
        mMap.addMarker(marker)
    }
}