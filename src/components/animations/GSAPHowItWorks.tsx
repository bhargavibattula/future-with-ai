"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import ExploreCoursesButton from "@/components/ui/ExploreCoursesButton";

export default function GSAPHowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    const sections = gsap.utils.toArray<HTMLElement>(".step");
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Pin the section and scroll horizontally
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          // Extended scroll length by multiplying by 4 for a much slower, leisurely scroll experience
          end: () => `+=${(containerRef.current?.scrollWidth || window.innerWidth) * 4}`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          snap: 1 / (sections.length - 1),
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Timeline for scrubbed interactive animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          end: () => `+=${(containerRef.current?.scrollWidth || window.innerWidth) * 4}`,
          scrub: 1.5, // Even smoother scrubbing
        },
      });

      // 1. Text reveals
      tl.from("#step1_text-1", {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          "#step1_text-2",
          {
            opacity: 0,
            rotateX: -45,
            y: -40,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        );

      // 2. Initial pop-in of the premium shapes
      tl.from(
        ".step1_shape",
        {
          opacity: 0,
          scale: 0.2,
          y: 100,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(2)",
        },
        "-=0.8"
      );

      // 3. INTERACTIVE SHAPE MOVEMENT WHILE SCROLLING
      // As the user continues to scroll horizontally, these massive shapes will float, rotate, and scale interactively
      tl.to(
        ".shape-blob",
        { y: -250, x: -150, rotation: -45, scale: 1.4, duration: 3 },
        "-=0.5"
      )
        .to(
          ".shape-ring",
          { y: 150, x: -200, rotation: 180, scale: 1.6, duration: 3 },
          "<"
        )
        .to(
          ".shape-pill",
          { y: -100, x: 200, rotation: -20, scale: 1.3, duration: 3 },
          "<"
        )
        .to(
          ".shape-diamond",
          { y: 250, x: 300, rotation: 90, scale: 1.8, duration: 3 },
          "<"
        );

      // 4. Step 2 text animations
      tl.from("#step2_heading_1", {
        y: -100,
        rotateX: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      }, "-=1")
        .from(
          "#step2_heading_2",
          {
            y: -80,
            rotateY: 30,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "-=0.8"
        )
        .from(
          "#step2_heading_3",
          {
            y: -60,
            rotateZ: -10,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .set("#step2-cont_text", { text: "" })
        .to("#step2-cont_text", {
          duration: 2,
          text: "Toolkit.ai accelerates your workflow-",
          ease: "none",
        })
        .from(
          ".step2-word",
          {
            opacity: 0,
            y: 40,
            scale: 0.8,
            stagger: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        )
        .to(
          ".step2_foot-text",
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            stagger: 0.5,
            ease: "elastic.out(1.2, 0.5)",
          },
          "-=0.5"
        );
    });
  }, { scope: containerRef });

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#FCFBFF] text-[#1E1B2E]"
    >
      <div className="absolute w-[75%] h-px bg-[#8B7FE8]/20 left-1/2 -translate-x-1/2 top-0" />

      <div ref={containerRef} className="flex w-screen flex-col lg:flex-row lg:w-[300vw] h-screen">

        {/* ─── Step 1 ─── */}
        <div className="step w-screen h-full flex relative isolate">
          <div className="grid lg:grid-cols-2 w-full max-w-7xl mx-auto px-6 sm:px-12 py-10 h-full items-center">

            {/* Left Content */}
            <div className="gap-10 space-y-12 lg:space-y-24 z-10 relative">
              <div className="flex flex-col gap-4 font-[var(--font-display)]">
                <span
                  id="step1_text-1"
                  className="relative rounded-2xl bg-[#D8D2FA] w-fit text-3xl lg:text-6xl font-bold capitalize px-6 py-3 text-[#8B7FE8] shadow-sm"
                >
                  Discover AI
                </span>
                <span
                  id="step1_text-2"
                  className="rounded-2xl bg-[#FFC9DE] w-fit text-2xl lg:text-5xl font-bold lg:translate-x-12 capitalize px-6 py-3 text-[#1E1B2E] shadow-sm"
                >
                  Boost Productivity
                </span>
              </div>

              <p className="lg:text-3xl text-[#6B6785] font-medium leading-relaxed max-w-xl">
                In today's fast-paced digital world, finding the right AI tools can be overwhelming. We curate and verify the best models to help you work smarter, not harder.
              </p>
            </div>

            {/* Right Interactive Premium CSS Shapes */}
            <div className="lg:relative absolute inset-0 max-lg:opacity-40 lg:opacity-100 pointer-events-none flex items-center justify-center">
              <div className="relative w-full h-[50vh] lg:h-full max-w-lg mx-auto">
                <div
                  className="step1_shape shape-blob absolute top-[10%] lg:top-[20%] right-[5%] w-[240px] h-[240px] lg:w-[450px] lg:h-[450px] opacity-80"
                  style={{
                    background: "radial-gradient(circle at 32% 28%, #D8D2FA, #8B7FE8 75%)",
                    borderRadius: "42% 58% 63% 37% / 45% 40% 60% 55%",
                  }}
                />
                <div
                  className="step1_shape shape-ring absolute top-[50%] lg:top-[50%] left-[5%] lg:left-[-10%] w-[180px] h-[180px] lg:w-[320px] lg:h-[320px] rounded-full"
                  style={{
                    background: "conic-gradient(from 180deg, #8B7FE8, #B8E8D8, #FFC9DE, #8B7FE8)",
                    WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 32px), #000 calc(100% - 30px))",
                    mask: "radial-gradient(farthest-side, transparent calc(100% - 32px), #000 calc(100% - 30px))",
                  }}
                />
                <div className="step1_shape shape-pill absolute top-[5%] lg:-top-[10%] left-[20%] lg:left-[10%] w-[140px] h-[50px] lg:w-[220px] lg:h-[80px] rounded-full bg-[#B8E8D8] rotate-12 flex items-center justify-center font-bold text-[#1E1B2E] text-lg lg:text-2xl shadow-xl">
                  Automate
                </div>
                <div className="step1_shape shape-diamond absolute bottom-[20%] lg:bottom-[10%] right-[20%] lg:right-[15%] w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] bg-[#FFC9DE] rounded-2xl rotate-45 shadow-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* ─── Step 2 ─── */}
        <div className="step w-screen h-full flex flex-col justify-center relative px-6 sm:px-12">
          <div className="absolute w-[75%] h-px bg-[#8B7FE8]/20 left-1/2 -translate-x-1/2 top-0 lg:hidden" />

          <div className="flex flex-wrap gap-4 lg:gap-8 items-center justify-center max-w-6xl mx-auto w-full text-center">

            <span
              id="step2_heading_1"
              className="lg:px-8 px-4 py-2 lg:py-4 bg-[#FFC9DE] text-4xl lg:text-8xl rounded-2xl lg:tracking-widest uppercase font-[var(--font-display)] font-bold text-[#1E1B2E] shadow-sm"
            >
              FIND
            </span>

            <span
              id="step2_heading_2"
              className="lg:px-6 px-3 py-1.5 lg:py-3 bg-[#B8E8D8] rounded-xl text-xl lg:text-3xl uppercase font-[var(--font-display)] font-bold text-[#1E1B2E] lg:rotate-12 lg:-translate-y-8 shadow-sm"
            >
              YOUR
            </span>

            <span
              id="step2_heading_3"
              className="lg:px-8 px-4 py-2 lg:py-4 bg-[#8B7FE8] rounded-2xl text-3xl lg:text-6xl uppercase font-[var(--font-display)] font-bold text-white shadow-lg"
            >
              PERFECT AI
            </span>

            {/* Fully responsive flex layout to prevent overlap issues */}
            <div className="flex flex-wrap justify-center gap-3 lg:gap-5 items-center text-[#1E1B2E] mt-8 lg:mt-12 font-[var(--font-display)] w-full max-w-5xl mx-auto">
              <span
                id="step2-cont_text"
                className="font-semibold text-2xl lg:text-5xl capitalize text-[#6B6785]"
              ></span>
              <span className="lg:hidden font-semibold text-xl text-[#6B6785]">
                Toolkit.ai accelerates your workflow-
              </span>

              <span className="step2-word font-bold lg:text-5xl text-xl lowercase text-[#8B7FE8]">
                discover-
              </span>
              <span className="step2-word font-bold lg:text-5xl text-xl lowercase text-[#8B7FE8]">
                compare-
              </span>

              <span
                className="step2_foot-text px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-tr from-[#FFC9DE] to-white rounded-xl lg:text-5xl text-xl uppercase font-bold text-[#1E1B2E] lg:opacity-0 translate-y-10 inline-block shadow-sm"
              >
                deploy
              </span>

              <span
                className="step2_foot-text px-3 py-1.5 lg:px-4 lg:py-2 bg-gradient-to-l from-[#B8E8D8] to-white rounded-lg text-xs lg:text-xl uppercase font-bold lg:-rotate-12 text-[#1E1B2E] lg:opacity-0 translate-y-10 inline-block shadow-sm"
              >
                the
              </span>

              <span
                className="step2_foot-text px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-br from-[#8B7FE8] to-[#1E1B2E] rounded-2xl shadow-xl lg:text-6xl text-2xl lg:opacity-0 translate-y-10 uppercase font-bold text-white inline-block"
              >
                best AI
              </span>
            </div>
          </div>
        </div>

        {/* ─── Step 3 ─── */}
        <div className="step w-screen h-full flex items-center justify-center relative">
          <div className="text-center space-y-8 px-6 max-w-4xl">
            <h2 className="font-[var(--font-display)] font-bold text-5xl lg:text-8xl tracking-tighter text-[#1E1B2E]">
              Ready to accelerate?
            </h2>
            <p className="text-xl text-[#6B6785] max-w-2xl mx-auto">
              Join thousands of creators and developers leveraging AI to build the future. Your perfect tool is waiting.
            </p>
            <div className="mt-8 flex justify-center">
              <ExploreCoursesButton theme="light">Explore Directory</ExploreCoursesButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
