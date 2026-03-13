import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

export default function GeographyPage() {
  const regions = [
    {
      name: 'Ancient Israel & Canaan',
      places: [
        { name: 'Jerusalem', desc: 'Holy city, Temple mount, seat of David\'s kingdom', refs: ['2 Sam 5:6-9', 'Ps 122', 'Isa 2:3', 'Matt 21:1', 'Acts 2'], lat: 31.7767, lng: 35.2345 },
        { name: 'Bethlehem', desc: 'Birthplace of David and Jesus, "House of Bread"', refs: ['Ruth 1:1', 'Mic 5:2', 'Matt 2:1', 'Luke 2:4'], lat: 31.7054, lng: 35.2024 },
        { name: 'Nazareth', desc: 'Childhood home of Jesus in Galilee', refs: ['Matt 2:23', 'Luke 4:16-30', 'John 1:46'], lat: 32.6996, lng: 35.3035 },
        { name: 'Bethany', desc: 'Village of Lazarus, Mary, and Martha, near Jerusalem', refs: ['John 11:1', 'Matt 21:17', 'Mark 14:3'], lat: 31.77, lng: 35.26 },
        { name: 'Jericho', desc: 'Oldest walled city, fell to Joshua\'s trumpets', refs: ['Josh 6', 'Luke 19:1-10', '2 Kings 2:4'], lat: 31.8611, lng: 35.4583 },
        { name: 'Hebron', desc: 'Abraham\'s burial site, David\'s first capital', refs: ['Gen 23:19', '2 Sam 2:1-4', 'Gen 13:18'], lat: 31.5326, lng: 35.0998 },
        { name: 'Beersheba', desc: 'Southern limit of Israel, well of Abraham\'s oath', refs: ['Gen 21:31', 'Gen 26:33', '1 Kings 19:3'], lat: 31.2518, lng: 34.7913 },
        { name: 'Mount Sinai', desc: 'Where Moses received the Ten Commandments', refs: ['Exod 19-20', 'Deut 5', 'Gal 4:24-25'], lat: 28.5394, lng: 33.9753 },
      ],
    },
    {
      name: 'Sea of Galilee Region',
      places: [
        { name: 'Capernaum', desc: 'Center of Jesus\' Galilean ministry', refs: ['Matt 4:13', 'Mark 1:21', 'John 6:59'], lat: 32.8808, lng: 35.5753 },
        { name: 'Sea of Galilee', desc: 'Freshwater lake where Jesus walked on water and calmed storms', refs: ['Matt 14:22-33', 'Mark 4:35-41', 'John 21:1'], lat: 32.8231, lng: 35.5831 },
        { name: 'Mount Tabor', desc: 'Traditional site of the Transfiguration', refs: ['Matt 17:1-9', 'Mark 9:2-8', 'Judg 4:6'], lat: 32.6869, lng: 35.3914 },
        { name: 'Cana', desc: 'Site of Jesus\' first miracle (water to wine)', refs: ['John 2:1-11', 'John 4:46'], lat: 32.75, lng: 35.34 },
      ],
    },
    {
      name: 'Mesopotamia & Ancient Near East',
      places: [
        { name: 'Ur of the Chaldees', desc: 'Abraham\'s birthplace in Sumer', refs: ['Gen 11:31', 'Gen 15:7', 'Neh 9:7'], lat: 30.9626, lng: 46.1031 },
        { name: 'Babylon', desc: 'Capital of the Neo-Babylonian Empire, site of the Exile', refs: ['Dan 1-6', '2 Kings 25', 'Ps 137', 'Rev 17-18'], lat: 32.5429, lng: 44.4209 },
        { name: 'Nineveh', desc: 'Capital of Assyria, destination of Jonah', refs: ['Jonah 1-4', 'Nah 1-3', '2 Kings 19:36'], lat: 36.3599, lng: 43.1526 },
        { name: 'Haran', desc: 'Abraham\'s stopping point en route to Canaan', refs: ['Gen 11:31', 'Gen 12:4', 'Gen 27:43'], lat: 36.8645, lng: 39.0298 },
      ],
    },
    {
      name: 'Egypt',
      places: [
        { name: 'Egypt (Goshen)', desc: 'Land of Israel\'s slavery and the Exodus', refs: ['Gen 46:28-34', 'Exod 1-15', 'Matt 2:14-15'], lat: 30.9, lng: 31.75 },
        { name: 'Red Sea', desc: 'Sea parted by God during the Exodus', refs: ['Exod 14:21-22', 'Exod 15:4', 'Ps 106:9'], lat: 28.0, lng: 34.0 },
        { name: 'Alexandria', desc: 'Major Jewish diaspora center, birthplace of Apollos', refs: ['Acts 18:24', 'Acts 6:9', 'Acts 27:6'], lat: 31.2001, lng: 29.9187 },
      ],
    },
    {
      name: 'Paul\'s Missionary Journeys',
      places: [
        { name: 'Damascus', desc: 'Site of Paul\'s conversion on the road', refs: ['Acts 9:1-19', 'Gal 1:17', '2 Cor 11:32'], lat: 33.5138, lng: 36.2765 },
        { name: 'Antioch', desc: 'Where believers were first called Christians', refs: ['Acts 11:26', 'Acts 13:1', 'Gal 2:11'], lat: 36.2, lng: 36.15 },
        { name: 'Ephesus', desc: 'Major city of Asia Minor, Paul\'s extended ministry', refs: ['Acts 19', 'Eph 1:1', 'Rev 2:1-7'], lat: 37.9394, lng: 27.3417 },
        { name: 'Corinth', desc: 'Commercial hub, recipient of Paul\'s letters', refs: ['Acts 18:1-18', '1 Cor 1:2', '2 Cor 1:1'], lat: 37.9063, lng: 22.8803 },
        { name: 'Athens', desc: 'Paul\'s Areopagus sermon on the "Unknown God"', refs: ['Acts 17:16-34'], lat: 37.9715, lng: 23.7267 },
        { name: 'Rome', desc: 'Capital of the Empire, Paul\'s final destination', refs: ['Acts 28:14-31', 'Rom 1:7', 'Phil 1:13'], lat: 41.9028, lng: 12.4964 },
        { name: 'Philippi', desc: 'First European church, Lydia\'s conversion', refs: ['Acts 16:12-40', 'Phil 1:1'], lat: 41.0147, lng: 24.2875 },
        { name: 'Thessalonica', desc: 'Major Macedonian city, Paul\'s letters', refs: ['Acts 17:1-9', '1 Thess 1:1', '2 Thess 1:1'], lat: 40.6401, lng: 22.9444 },
      ],
    },
    {
      name: 'Seven Churches of Revelation',
      places: [
        { name: 'Ephesus', desc: 'Lost its first love (Rev 2:1-7)', refs: ['Rev 2:1-7'], lat: 37.9394, lng: 27.3417 },
        { name: 'Smyrna', desc: 'Faithful under persecution (Rev 2:8-11)', refs: ['Rev 2:8-11'], lat: 38.4237, lng: 27.1428 },
        { name: 'Pergamum', desc: 'Where Satan\'s throne is (Rev 2:12-17)', refs: ['Rev 2:12-17'], lat: 39.1217, lng: 27.1839 },
        { name: 'Thyatira', desc: 'Tolerated Jezebel (Rev 2:18-29)', refs: ['Rev 2:18-29'], lat: 38.9197, lng: 27.8378 },
        { name: 'Sardis', desc: 'Dead church, wake up (Rev 3:1-6)', refs: ['Rev 3:1-6'], lat: 38.4883, lng: 28.0406 },
        { name: 'Philadelphia', desc: 'Open door, faithful (Rev 3:7-13)', refs: ['Rev 3:7-13'], lat: 38.3467, lng: 28.5203 },
        { name: 'Laodicea', desc: 'Lukewarm, neither hot nor cold (Rev 3:14-22)', refs: ['Rev 3:14-22'], lat: 37.8322, lng: 29.1081 },
      ],
    },
  ];

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">
            🗺️ Biblical Geography
          </h1>
          <p className="text-parchment-400 text-sm">
            Explore key locations from Scripture with historical context and verse references.
          </p>
        </div>

        {regions.map(region => (
          <section key={region.name} className="mb-8">
            <h2 className="text-xl font-semibold text-gold-400 mb-4 font-serif">{region.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {region.places.map(place => (
                <div
                  key={place.name + place.desc}
                  className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-parchment-100">{place.name}</h3>
                    <a
                      href={`https://www.google.com/maps/@${place.lat},${place.lng},12z`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-2 py-1 rounded bg-parchment-800 text-parchment-400 hover:bg-gold-600 hover:text-parchment-950 transition-colors flex-shrink-0"
                    >
                      📍 Map
                    </a>
                  </div>
                  <p className="text-sm text-parchment-300 mb-2">{place.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {place.refs.map(ref => (
                      <span key={ref} className="text-xs px-2 py-0.5 rounded bg-parchment-800 text-gold-400">
                        {ref}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
