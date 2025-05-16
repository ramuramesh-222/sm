import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;




/*

To implement a GPS-based bus tracking system using Django (backend) and ReactJS (frontend), where:

The bus (driver) starts tracking only after turning on GPS.

The student can see real-time bus location (where the bus is coming).

Here’s a step-by-step breakdown of how to do it:

✅ 1. Backend (Django) Setup
A. Create Models
python
Copy
Edit
# models.py
from django.db import models
from django.contrib.auth.models import User

class Bus(models.Model):
    name = models.CharField(max_length=100)
    driver = models.OneToOneField(User, on_delete=models.CASCADE)  # assumes driver is a user
    is_tracking = models.BooleanField(default=False)

class BusLocation(models.Model):
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE)
    latitude = models.FloatField()
    longitude = models.FloatField()
    timestamp = models.DateTimeField(auto_now=True)
✅ 2. GPS Start/Stop API (Django REST Framework)
A. Toggle tracking on/off (by driver)
python
Copy
Edit
# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Bus

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_tracking(request):
    bus = Bus.objects.get(driver=request.user)
    bus.is_tracking = not bus.is_tracking
    bus.save()
    return Response({'tracking': bus.is_tracking})
B. Update GPS Location API (called by bus/driver app)
python
Copy
Edit
from .models import BusLocation

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_location(request):
    bus = Bus.objects.get(driver=request.user)
    if bus.is_tracking:
        BusLocation.objects.create(
            bus=bus,
            latitude=request.data['latitude'],
            longitude=request.data['longitude']
        )
        return Response({'status': 'location updated'})
    return Response({'status': 'tracking not enabled'}, status=400)
✅ 3. WebSocket Setup for Live Tracking (Django Channels)
A. Install Channels:
bash
Copy
Edit
pip install channels channels_redis
B. Setup Channels in settings.py
python
Copy
Edit
ASGI_APPLICATION = 'yourproject.routing.application'

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("localhost", 6379)],
        },
    },
}
C. Create Consumer to Broadcast Location
python
Copy
Edit
# consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class BusTrackingConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.bus_id = self.scope['url_route']['kwargs']['bus_id']
        self.group_name = f'bus_{self.bus_id}'
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'send_location',
                'latitude': data['latitude'],
                'longitude': data['longitude'],
            }
        )

    async def send_location(self, event):
        await self.send(text_data=json.dumps({
            'latitude': event['latitude'],
            'longitude': event['longitude'],
        }))
D. Routing
python
Copy
Edit
# routing.py
from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/track/(?P<bus_id>\d+)/$', consumers.BusTrackingConsumer.as_asgi()),
]
✅ 4. React Frontend (Student Side)
A. Connect to WebSocket and Show on Map
jsx
Copy
Edit
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const BusTracking = ({ busId }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/track/${busId}/`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLocation({ lat: data.latitude, lng: data.longitude });
    };

    return () => socket.close();
  }, [busId]);

  return (
    <div>
      {location ? (
        <MapContainer center={location} zoom={15} style={{ height: '500px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={location}></Marker>
        </MapContainer>
      ) : (
        <p>Waiting for location...</p>
      )}
    </div>
  );
};

export default BusTracking;
✅ 5. React Frontend (Driver Side)
Use navigator.geolocation.watchPosition() to send live GPS data:

jsx
Copy
Edit
useEffect(() => {
  const watchId = navigator.geolocation.watchPosition((position) => {
    fetch('/api/update-location/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    });

    socket.send(JSON.stringify({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }));
  });

  return () => navigator.geolocation.clearWatch(watchId);
}, []);
✅ Summary
Role	Feature
Driver	Start/Stop GPS tracking, send location updates
Backend	Save location, broadcast via WebSocket
Student	See real-time bus location on map

Would you like me to help build it step-by-step from models → views → WebSocket → React?







You said:
yes


ChatGPT said:
Great! Let's build the GPS Bus Tracking System (Django + ReactJS) step by step.

🚧 STEP 1: Django Backend - Models Setup
We’ll start with the backend models:

Bus: represents a single bus, linked to a driver.

BusLocation: stores live location updates from the bus.

📄 models.py
python
Copy
Edit
# your_app/models.py
from django.db import models
from django.contrib.auth.models import User

class Bus(models.Model):
    name = models.CharField(max_length=100)
    driver = models.OneToOneField(User, on_delete=models.CASCADE)
    is_tracking = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class BusLocation(models.Model):
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE)
    latitude = models.FloatField()
    longitude = models.FloatField()
    timestamp = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.bus.name} at ({self.latitude}, {self.longitude})"
✅ Next Steps
Add this model to your app.

Run the migrations:

bash
Copy
Edit
python manage.py makemigrations
python manage.py migrate
✅ Confirm:
Let me know your app name (e.g., tracking, busapp) so I use the correct imports later.

After this, we will create:

API endpoints to toggle tracking and update GPS location.

WebSocket setup with Django Channels.

React frontend to display live tracking.

Would you like to continue with the API views next?







You said:
yes


ChatGPT said:
Perfect! Let’s move to the API views using Django REST Framework.

🚧 STEP 2: Django API Views
We’ll build two key APIs:

toggle_tracking – Driver turns GPS tracking on/off.

update_location – Driver sends current location (lat/lng) to the server.

📄 views.py
python
Copy
Edit
# your_app/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Bus, BusLocation

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_tracking(request):
    try:
        bus = Bus.objects.get(driver=request.user)
        bus.is_tracking = not bus.is_tracking
        bus.save()
        return Response({'tracking': bus.is_tracking})
    except Bus.DoesNotExist:
        return Response({'error': 'Bus not found for this driver'}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_location(request):
    try:
        bus = Bus.objects.get(driver=request.user)
        if not bus.is_tracking:
            return Response({'error': 'Tracking is OFF'}, status=400)

        latitude = request.data.get('latitude')
        longitude = request.data.get('longitude')

        if latitude is None or longitude is None:
            return Response({'error': 'Latitude and Longitude required'}, status=400)

        BusLocation.objects.create(bus=bus, latitude=latitude, longitude=longitude)
        return Response({'status': 'Location updated'})
    except Bus.DoesNotExist:
        return Response({'error': 'Bus not found for this driver'}, status=404)
📄 urls.py
Add these APIs to your app's urls.py:

python
Copy
Edit
# your_app/urls.py
from django.urls import path
from .views import toggle_tracking, update_location

urlpatterns = [
    path('api/toggle-tracking/', toggle_tracking),
    path('api/update-location/', update_location),
]
Include this in your main urls.py:

python
Copy
Edit
# project/urls.py
from django.urls import path, include

urlpatterns = [
    path('', include('your_app.urls')),
]
✅ Next Steps
Once you’ve added this:

Test /api/toggle-tracking/ with a logged-in driver user.

Test /api/update-location/ with some lat/lng values.

🚀 Ready for the next step?
Next, we'll:

Set up Django Channels and WebSocket consumer for real-time tracking.

Let me know once this part is complete or if you need help testing the APIs.







You said:
yes


ChatGPT said:
Awesome! Let's move to the real-time tracking part using Django Channels and WebSockets.

🚧 STEP 3: Real-Time Tracking with Django Channels
We’ll now:

Install and configure Channels.

Create a WebSocket consumer that broadcasts live GPS location.

Use Redis as a message broker.

✅ 1. Install Channels and Redis
bash
Copy
Edit
pip install channels channels_redis
Make sure Redis is running. If you don’t have it yet:

For Ubuntu/Debian:
bash
Copy
Edit
sudo apt install redis-server
For Windows:
Use Memurai or Redis for Windows.

✅ 2. Update settings.py
python
Copy
Edit
# settings.py
INSTALLED_APPS = [
    # ...
    'channels',
    'your_app',  # your tracking app
]

ASGI_APPLICATION = 'your_project_name.asgi.application'

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("localhost", 6379)],
        },
    },
}
✅ 3. Create asgi.py
Make sure your asgi.py looks like this:

python
Copy
Edit
# your_project_name/asgi.py
import os
import django
from channels.routing import get_default_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project_name.settings')
django.setup()
application = get_default_application()
✅ 4. Create WebSocket Consumer
📄 consumers.py
python
Copy
Edit
# your_app/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class BusTrackingConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.bus_id = self.scope['url_route']['kwargs']['bus_id']
        self.group_name = f'bus_{self.bus_id}'

        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        latitude = data['latitude']
        longitude = data['longitude']

        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'send_location',
                'latitude': latitude,
                'longitude': longitude,
            }
        )

    async def send_location(self, event):
        await self.send(text_data=json.dumps({
            'latitude': event['latitude'],
            'longitude': event['longitude'],
        }))
✅ 5. Add WebSocket Routing
📄 routing.py (Create this in your project root)
python
Copy
Edit
# your_project_name/routing.py
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import re_path
from your_app.consumers import BusTrackingConsumer

application = ProtocolTypeRouter({
    "websocket": AuthMiddlewareStack(
        URLRouter([
            re_path(r'ws/track/(?P<bus_id>\d+)/$', BusTrackingConsumer.as_asgi()),
        ])
    ),
})
Update your asgi.py to import this application:

python
Copy
Edit
# asgi.py
from your_project_name.routing import application
✅ 6. Run the Development Server with Redis
bash
Copy
Edit
# Make sure Redis is running
redis-server

# Then run Django
python manage.py runserver
✅ Next Step: ReactJS Frontend
Now we’ll build the React frontend:

Driver side: sends location via WebSocket + API.

Student side: shows real-time location on a map.

Would you like to build the Student (map view) or Driver (tracking sender) first?







You said:
Student (map view)


ChatGPT said:
Great! Let’s build the Student-side ReactJS map view to show the real-time bus location.

We'll use:

WebSocket to receive live location.

React Leaflet for the map view.

✅ STEP 4: ReactJS — Student Map View
📦 1. Install Required Packages
bash
Copy
Edit
npm install react-leaflet leaflet
Also, add the Leaflet CSS to your app (usually in index.js or App.js):

js
Copy
Edit
import 'leaflet/dist/leaflet.css';
🧭 2. Create BusTracking.js
jsx
Copy
Edit
// src/components/BusTracking.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const BusTracking = ({ busId }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/track/${busId}/`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLocation({ lat: data.latitude, lng: data.longitude });
    };

    return () => socket.close();
  }, [busId]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Live Bus Location</h2>
      {location ? (
        <MapContainer
          center={location}
          zoom={16}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={location}>
            <Popup>Bus is here!</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Waiting for location update...</p>
      )}
    </div>
  );
};

export default BusTracking;
🧪 3. Use the Component
Use it in your App.js or a route:

jsx
Copy
Edit
// App.js or BusPage.js
import BusTracking from './components/BusTracking';

function App() {
  return (
    <div>
      <BusTracking busId={1} /> 
    </div>
  );
}


*/



// 📝 Notes:
// Make sure busId matches a real Bus object in Django.

// The WebSocket URL (ws://localhost:8000/ws/track/1/) should point to your Django Channels route.

// You can secure this WebSocket with JWT token auth later if needed.

