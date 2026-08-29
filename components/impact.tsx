"use client";

import React, { useEffect, useRef, useState } from "react";

interface ImpactItem {
  icon: string;
  value: number;
  suffix: string;
  label: string;
}

const impactData: ImpactItem[] = [
  {
    icon: "/assets/icons/icons1/a.svg",
    value: 175,
    suffix: "+",
    label: "Campaign & Research Projects",
  },
  {
    icon: "/assets/icons/icons1/b.svg",
    value: 5,
    suffix: "+",
    label: "States Covered",
  },
  {
    icon: "/assets/icons/icons1/c.svg",
    value: 518,
    suffix: "+",
    label: "Assembly Constituencies Analysed",
  },
  {
    icon: "/assets/icons/icons1/d.svg",
    value: 3.4,
    suffix: "M+",
    label: "Voter Interactions",
  },
];

const Impact = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [countStarted, setCountStarted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setCountStarted(true);

          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`impact-section ${
        isVisible ? "impact-visible" : ""
      }`}
    >
      <div className="impact-container">
        {/* Header */}
        <div className="impact-header">
          <h2 className="impact-title">Our Impact in Numbers</h2>

          <div className="impact-title-line" />

          <p className="impact-description">
            We create people-centred strategies, driven by data, curated
            insights, and micro-to-macro planning.
          </p>
        </div>

        {/* Impact Items */}
        <div className="impact-grid">
          {impactData.map((item, index) => (
            <ImpactCard
              key={item.label}
              item={item}
              index={index}
              countStarted={countStarted}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ImpactCardProps {
  item: ImpactItem;
  index: number;
  countStarted: boolean;
}

const ImpactCard = ({
  item,
  index,
  countStarted,
}: ImpactCardProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!countStarted) return;

    const duration = 1600;
    const startTime = performance.now();

    let animationFrame: number;

    const animateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      // Linear progress from 0 to 1
      const progress = Math.min(elapsed / duration, 1);

      // Linear counter
      const currentValue = item.value * progress;

      if (item.value % 1 !== 0) {
        setCount(Number(currentValue.toFixed(1)));
      } else {
        setCount(Math.floor(currentValue));
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateCount);
      } else {
        setCount(item.value);
      }
    };

    animationFrame = requestAnimationFrame(animateCount);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [countStarted, item.value]);

  return (
    <div
      className="impact-card"
      style={
        {
          "--impact-delay": `${index * 120}ms`,
        } as React.CSSProperties
      }
    >
      {/* Icon */}
      <div className="impact-icon-wrapper">
        <img
          src={item.icon}
          alt=""
          className="impact-icon"
          draggable={false}
        />
      </div>

      {/* Content */}
      <div className="impact-content">
        <div className="impact-number">
          {item.value % 1 !== 0 ? count.toFixed(1) : count}
          {item.suffix}
        </div>

        <div className="impact-label">{item.label}</div>
      </div>
    </div>
  );
};

export default Impact;