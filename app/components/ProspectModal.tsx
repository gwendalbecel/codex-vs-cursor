'use client'

export interface Prospect {
  id: number
  name: string
  address: string
  phone: string
  email: string
  latitude: number
  longitude: number
}

export default function ProspectModal({ prospect, onClose }: { prospect: Prospect; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-4 rounded w-80 space-y-2">
        <h2 className="text-lg font-semibold">{prospect.name}</h2>
        <p>{prospect.address}</p>
        <p>{prospect.phone}</p>
        <div className="flex space-x-2 mt-4">
          <a href={`tel:${prospect.phone}`} className="flex-1 p-2 bg-green-600 text-white text-center rounded">Appeler</a>
          <a href={`mailto:${prospect.email}`} className="flex-1 p-2 bg-blue-600 text-white text-center rounded">Email</a>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${prospect.latitude},${prospect.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 p-2 bg-gray-600 text-white text-center rounded"
          >
            Itinéraire
          </a>
        </div>
        <button onClick={onClose} className="mt-4 w-full p-2 bg-red-600 text-white rounded">Fermer</button>
      </div>
    </div>
  )
}
