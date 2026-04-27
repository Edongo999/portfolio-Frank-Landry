import React from "react";
import Hero from "@/components/section/hero/Hero";
import About from "@/components/section/about/About";
import Skills from "@/components/section/skills/Skills";
import Projects from "@/components/section/projects/Projects";
import Experience from "@/components/section/experience/Experience";
import Contact from "@/components/section/contact/Contact";

const Home = () => {
  return (
    <div>
      <section id="hero">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="skills">
        <Skills />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="experience">
        <Experience />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default Home;
