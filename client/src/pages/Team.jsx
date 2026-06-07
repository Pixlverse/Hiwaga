import { Linkedin, ArrowUpRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Reveal from '@/components/Reveal'

import asish from '@/assets/team/Asish.JPG'
import rojin from '@/assets/team/Rojin.JPG'
import ananthu from '@/assets/team/Ananthu.JPG'
import jayasree from '@/assets/team/Jayasree.JPG'
import karthik from '@/assets/team/Karthik.JPG'
import joseph from '@/assets/team/Joseph.JPG'
import jinto from '@/assets/team/Jinto.JPG'
import amay from '@/assets/team/Amay.JPG'
import lijo from '@/assets/team/Lijo.JPG'
import abhijith from '@/assets/team/Abhijith.JPG'
import joshy from '@/assets/team/Joshy.JPG'
import akshay from '@/assets/team/Akshay.JPG'
import prajeesh from '@/assets/team/Prajeesh.JPG'

const founder = {
  name: 'Asish Thomas Murickaveli',
  role: 'Creative Director',
  image: asish,
  linkedin: 'https://www.linkedin.com/in/asishmurickaveli/',
  bio: [
    'Asish founded Hiwaga Makers immediately after graduating in Business Administration. He brings together business thinking and creative instinct at the core of the agency. With hands-on experience in videography, music composition, video editing and as an Assistant Director in films, his journey began with video content production.',
    'In the early stages, his focus on upskilling, building the right team and effective delegation helped shape Hiwaga into a full-service, 360-degree marketing agency in a short span of time. Today, Asish leads business development, drives creative direction for campaigns and advertisements, and is actively focused on expanding Hiwaga’s presence in the Middle East.',
  ],
}

const team = [
  {
    name: 'Rojin Abraham',
    role: 'Brand Consultant — Middle East',
    image: rojin,
    linkedin: null,
    bio: 'Rojin has been an integral part of Hiwaga Makers since its early phase and played a key role as the Creative Director for nearly two years. Currently, as a Brand Consultant, he brings a forward-thinking approach to creative problem-solving while supporting strategic decisions, particularly for Middle East–focused projects.',
  },
  {
    name: 'Ananthu Vasudev',
    role: 'Head of Brand Strategy',
    image: ananthu,
    linkedin: 'https://www.linkedin.com/in/ananthu-in/',
    bio: 'With 15 years of experience across multiple industries — including over a decade in branding and digital marketing — Ananthu leads brand strategy, client operations and strategic planning at Hiwaga Makers. He is the driving force behind structuring campaigns and ensuring clarity across key accounts.',
  },
  {
    name: 'Jayasree Menon V',
    role: 'Creative Consultant',
    image: jayasree,
    linkedin: null,
    bio: 'Jayasree is a post-graduate in Fine Arts and a seasoned creative professional with more than 13 years of experience across India and the Middle East. Her expertise spans photography, videography, editing, graphic design and web design — bringing a holistic creative perspective to brand strategy.',
  },
  {
    name: 'Karthik Shaji',
    role: 'Senior DOP & Editor',
    image: karthik,
    bio: 'The first team member of Hiwaga, Karthik has evolved into a highly professional videographer and editor. He leads multiple projects with experience, consistency and creative depth.',
  },
  {
    name: 'Joseph John',
    role: 'Senior DOP & Editor',
    image: joseph,
    bio: 'A passionate videographer and editor focused on visual storytelling. Joseph independently handles creative projects from planning to execution with a strong narrative approach.',
  },
  {
    name: 'Jinto Philip',
    role: 'Senior Graphic Designer',
    image: jinto,
    bio: 'Started as a part-time designer, Jinto grew into a core member of the team. He plays a major role in shaping brand identities and defining the design language for clients.',
  },
  {
    name: 'Amay Jojo',
    role: 'Performance Marketing Specialist',
    image: amay,
    bio: 'Amay focuses on driving consistent performance through experimentation and optimisation. He manages key accounts while ensuring measurable results and lead growth for clients.',
  },
  {
    name: 'Lijo John',
    role: 'Social Media Executive',
    image: lijo,
    bio: 'Focused on copywriting, content planning and campaign building, Lijo manages key client accounts with attention to communication and execution. His work strengthens brand messaging across platforms.',
  },
  {
    name: 'Abhijith S',
    role: 'Graphic Designer',
    image: abhijith,
    bio: 'A skilled visual artist with a strong eye for design and composition. Abhijith contributes to brand creatives and campaigns with clarity and visual direction.',
  },
  {
    name: 'Joshy Varghese',
    role: 'Video Editor',
    image: joshy,
    bio: 'Joshy handles SEO for select client websites while also managing videography and video editing. His ability to balance structured optimisation with creative execution makes him a versatile contributor.',
  },
  {
    name: 'Akshay V S',
    role: 'Business Development Executive',
    image: akshay,
    bio: 'With prior experience at Amazon and the British Council, Akshay brings a strong business perspective blended with artistic thinking. He plays a key role in building client relationships and exploring growth opportunities.',
  },
  {
    name: 'Prajeesh',
    role: 'Social Media Executive',
    image: prajeesh,
    bio: 'Started at Hiwaga as a social media intern and quickly adapted to handling multiple client accounts and communications. His growth in confidence and responsibility made him an integral part of the team within months.',
  },
]

function SectionLabel({ children, id }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span aria-hidden="true" className="h-px w-8 bg-neutral-500" />
      <h2
        id={id}
        className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs md:text-sm"
      >
        {children}
      </h2>
      <span aria-hidden="true" className="h-px w-8 bg-neutral-500" />
    </div>
  )
}

function TeamCard({ member, delay = 0 }) {
  return (
    <Reveal as="article" delay={delay} className="h-full">
      <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors duration-500 hover:border-white/25">
        <div className="aspect-[4/5] overflow-hidden bg-neutral-900">
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3
                className="font-display text-xl font-medium leading-tight text-white sm:text-2xl"
                style={{
                  fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                }}
              >
                {member.name}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#FFD700]/90 sm:text-[13px]">
                {member.role}
              </p>
            </div>

            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white transition-colors duration-300 hover:border-[#FFD700]/60 hover:bg-[#FFD700]/10"
              >
                <Linkedin aria-hidden="true" className="h-4 w-4" />
              </a>
            )}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-neutral-400 sm:text-[15px]">
            {member.bio}
          </p>
        </div>
      </div>
    </Reveal>
  )
}

export default function Team() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <main>
        {/* Page hero */}
        <section
          aria-labelledby="page-title"
          className="relative isolate overflow-hidden bg-neutral-950 text-white"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-32 -z-10 mx-auto h-96 max-w-3xl opacity-40 blur-3xl"
            style={{
              background:
                'radial-gradient(closest-side, rgba(255,255,255,0.18), rgba(255,255,255,0) 70%)',
            }}
          />

          <div className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24 lg:pt-36">
            <div className="mx-auto max-w-4xl text-center">
              <h1
                id="page-title"
                className="font-display text-6xl font-medium leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[4.5rem]"
                style={{
                  fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                }}
              >
                <span className="text-[#FFD700]">Our</span>{' '}
                <span className="text-white">Team</span>
                <span className="text-[#FFD700]/50">.</span>
              </h1>

              <div
                aria-hidden="true"
                className="mx-auto mt-10 h-px w-20 bg-white/20 sm:mt-12"
              />

              <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
                A small, sharp team of strategists, storytellers, designers and
                makers — building brands with clarity, care and craft.
              </p>
            </div>
          </div>
        </section>

        {/* Founder — featured */}
        <section aria-labelledby="founder-heading" className="bg-neutral-950">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <Reveal>
              <SectionLabel id="founder-heading">Founder</SectionLabel>
            </Reveal>

            <Reveal delay={120}>
              <article className="mt-12 grid grid-cols-1 gap-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6 sm:mt-16 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-10">
                <div className="lg:col-span-5">
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center lg:col-span-7">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#FFD700]/85 sm:text-xs">
                    {founder.role}
                  </p>

                  <h3
                    className="mt-3 font-display text-3xl font-medium leading-[1.05] text-white sm:text-4xl md:text-5xl"
                    style={{
                      fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                    }}
                  >
                    {founder.name}
                  </h3>

                  <div
                    aria-hidden="true"
                    className="mt-5 h-px w-12 bg-[#FFD700]/60 sm:mt-6"
                  />

                  <div className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-300 sm:text-base sm:leading-relaxed">
                    {founder.bio.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  {founder.linkedin && (
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-7 inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-300 hover:border-[#FFD700]/60 hover:bg-[#FFD700]/10 sm:mt-8 sm:px-5 sm:text-[13px]"
                    >
                      <Linkedin aria-hidden="true" className="h-4 w-4" />
                      Connect on LinkedIn
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        {/* The team */}
        <section aria-labelledby="team-heading" className="bg-neutral-950">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
            <Reveal>
              <SectionLabel id="team-heading">The Team</SectionLabel>
            </Reveal>

            <ul
              role="list"
              className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
            >
              {team.map((member, i) => (
                <li key={member.name} className="h-full">
                  <TeamCard member={member} delay={(i % 3) * 100} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
