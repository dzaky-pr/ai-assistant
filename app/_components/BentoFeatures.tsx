import { BentoCard, BentoGrid } from '@/components/bento-grid'

import { FileText, Lock, MessageCircle, Search } from 'lucide-react'

const features = [
  {
    Icon: MessageCircle,
    name: 'Tanya Jawab Instan',
    description:
      'Dapatkan jawaban langsung mengenai peraturan PLN melalui chatbot interaktif.',
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3'
  },

  {
    Icon: FileText,
    name: 'Ringkasan Otomatis',
    description:
      'Kecerdasan buatan merangkum dokumen regulasi yang panjang menjadi poin-poin utama.',
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4'
  },
  {
    Icon: Search,
    name: 'Pencarian Cerdas',
    description:
      'Temukan peraturan spesifik dengan pencarian semantik berbasis AI.',
    className: 'lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2'
  },
  {
    Icon: Lock,
    name: 'Keamanan Data',
    description:
      'Dilengkapi dengan kontrol akses berbasis peran dan enkripsi penuh untuk perlindungan data.',
    className: 'lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-4'
  }
]

export function BentoFeaturesSection() {
  return (
    <BentoGrid className="lg:grid-rows-3 lg:grid-cols-2">
      {features.map((feature, e) => (
        <BentoCard background={undefined} key={e} {...feature} />
      ))}
    </BentoGrid>
  )
}
