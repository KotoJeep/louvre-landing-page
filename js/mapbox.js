mapboxgl.accessToken = 'pk.eyJ1Ijoia290b2plZXAiLCJhIjoiY2t1cGRpNHloMmswdzJ4bjZsdm8wNTI4dCJ9.8zqKwN7cJDul85E4ILDLwA';

const map = new mapboxgl.Map({
	container: 'mapbox',
	style: 'mapbox://styles/kotojeep/ckupdyav418px17pkxs5g6gq0',
	center: [2.3364, 48.86091],
	zoom: 15.75,
});

const nav = new mapboxgl.NavigationControl({
	showCompass: true,
	showZoom: true,
});

map.addControl(nav, 'top-right');

const markerLouvre = new mapboxgl.Marker({ color: '#171717' })
	.setLngLat([2.3364, 48.86091])
	.setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>Louvre</h3><p>Louvre museum and a large glass pyramid</p>`))
	.addTo(map);

const marker2 = new mapboxgl.Marker({ color: '#757575' })
	.setLngLat([2.3333, 48.8602])
	.setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>Pavillon de la trémoille</h3><p>Very beautiful architecture</p>`))
	.addTo(map);

const marker3 = new mapboxgl.Marker({ color: '#757575' })
	.setLngLat([2.3397, 48.8607])
	.setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>Cour Carrée</h3><p>One of the main courtyards of the Louvre Palace in Paris.</p>`))
	.addTo(map);

const marker4 = new mapboxgl.Marker({ color: '#757575' })
	.setLngLat([2.333, 48.8619])
	.setPopup(
		new mapboxgl.Popup({ offset: 25 }).setHTML(
			`<h3>Arc de Triomphe du Carrousel</h3><p>It is an example of Neoclassical architecture in the Corinthian order.</p>`,
		),
	)
	.addTo(map);

const marker5 = new mapboxgl.Marker({ color: '#757575' })
	.setLngLat([2.3365, 48.8625])
	.setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>Subway station</h3><p>Palais-Royal - Musée du Louvre.</p>`))
	.addTo(map);
