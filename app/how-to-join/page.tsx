import Title from "@/components/AboutmeComponents/title";
import ImageCont from "@/components/AboutmeComponents/image-cont";    

const Content = ({heading}: {heading: string}) => {
    return(
        <div>
            <h2 className="text-3xl font-bold text-black mb-7">{heading}</h2>

            <div className="space-y-4 text-base leading-relaxed text-black">
              <p>
                The Order of the Knights of St. Mulumba (KSM) was established in Nigeria on June 14, 1953 by Late
                Reverend Father Abraham Njemeh Isidahome Ojefua, a Priest and Monk from Ifiiah Monastery in present day
                Delta state and modelled after the Sacred Order of Catholic Knighthood. It has a current membership of
                over 20,000 (both male and female)
              </p>

              <p>
                The vision of the organization was initiated on June 7, 1952 at the instance of the Holy father who had
                a mystic encounter in his prayer time, for the establishment of a catholic vibrant organization in
                Nigeria in 2004
              </p>
            </div>
          </div>
    )
}
export default function Home() {

  return (
    <main className="w-full py-10 bg-white">
      
      <Title title='How to Join'/>

      {/* Main Content */}
      <section className="w-full px-6 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Image Placeholder */}
          <ImageCont caption='Members of the knight of st mulumba '/>
          <div>
            <Content heading='How to Join'/>
          </div>
        </div>
      </section>
    </main>
  )
}
