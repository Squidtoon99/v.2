import { About, Contact, Features, Hero, Projects } from '@/components';
import { getProjects } from '@/data';
import { Project } from '@/interfaces';
import type { GetStaticProps, NextPage } from 'next';
import { useEffect } from 'react';

const Home: NextPage<{ projects: Project[]; }> = ({ projects }) => {
  useEffect(() => {
    // apply blur effect to background image after 1 second
    setTimeout(() => {
      const backgroundImage = document.querySelector('.background-image');
      backgroundImage?.classList.add('blur-lg');
    }, 1000);
  });
  return <>
    <div className="flex gap-4 flex-col mt-2">
      <Hero />
      <About />
      <Features projects={projects} />
      <Projects projects={projects} />
      <Contact />
    </div>
  </>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const projects = getProjects();
  return { props: { projects } };
};

export default Home;
