import React, { useState } from 'react';
import { Section } from './Section';
import { DialogueItem } from './DialogueItem';
import { DialogueEntry } from '../types';
import { ShieldCheck, Info, Search } from 'lucide-react';

export const StrategicDialogue: React.FC = () => {
  const dialogue: DialogueEntry[] = [
    {
      speaker: "INFRASTRUCTURE ARCHITECT",
      text: "K. Morgan, you’ve framed this transition not as a speculative event, but as an engineering inevitability. Why is a \"Neutral Bridge\" required for global liquidity?"
    },
    {
      speaker: "Morgan",
      text: "Because we are reaching the physical limits of the correspondent banking model. We have roughly $27 trillion in dormant liquidity trapped in nostro/vostro accounts just to cover settlement latency. In a multi-polar world, sovereign actors require a settlement rail that is not only fast but mathematically neutral—a bridge that doesn't embed another participant's discretionary policy at the protocol level."
    },
    {
      speaker: "INFRASTRUCTURE ARCHITECT",
      text: "Your work focuses heavily on \"Value Density.\" Why is a six-figure price for a bridge asset like XRP a functional requirement rather than a prediction?"
    },
    {
      speaker: "Morgan",
      text: "It’s a matter of market microstructure and load-bearing capacity. If you attempt to route a $10 billion institutional payment through an asset priced at $2.50, you require 4 billion units—more than the visible exchange float. At that unit count, you exhaust immediate order-book depth faster than the market can replenish it. To move sovereign-scale volume without destabilizing the market, the asset must achieve high value density ($10,000 to $100,000+) to reduce the execution footprint to a manageable size."
    },
    {
      speaker: "INFRASTRUCTURE ARCHITECT",
      text: "You’ve identified \"Protocol 22\" as the final gating factor. How does privacy unlock this $27 trillion in \"dead capital\"?"
    },
    {
      speaker: "Morgan",
      text: "Institutional and sovereign actors cannot operate on fully transparent rails where competitors can front-run their strategies. Protocol 22 introduces Zero-Knowledge Proofs (ZKPs) and \"View Keys\". This allows an institution to prove solvency and compliance to a regulator without broadcasting sensitive transaction metadata to the general public. Once you solve for \"Privacy under Supervision,\" the economic incentive to release that dormant capital becomes an evolutionary pressure that legacy finance cannot ignore."
    },
    {
      speaker: "INFRASTRUCTURE ARCHITECT",
      text: "The \"Reset\" is anchored to a very specific date in your manuscript: January 18, 2027. Why?"
    },
    {
      speaker: "Morgan",
      text: "That is the statutory backstop for the GENIUS Act. It establishes the federal framework for payment stablecoins and forces a \"Liquidity Basin Handoff\". We are moving from the offshore, opaque \"Prototype Era\" to a supervised, vertically integrated financial operating system."
    }
  ];

  return (
    <Section id="dialogue" className="bg-matte-black border-b border-white/5" label="Strategic Dialogue // Forensic Exhibit">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-10 p-4 bg-electric-teal/5 border border-electric-teal/20 flex gap-4 items-center rounded-sm">
           <Search size={20} className="text-electric-teal" />
           <p className="text-xs font-mono text-white/60">Hover over Morgan's responses to intercept the forensic reasoning behind each system pillar.</p>
        </div>

        {dialogue.map((entry, idx) => (
           <div key={idx} className="group relative">
              <DialogueItem entry={entry} />
              {entry.speaker === "Morgan" && (
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-2 bg-matte-black border border-electric-teal/30 rounded-full cursor-help shadow-[0_0_15px_#38bdf822]">
                    <Info size={14} className="text-electric-teal" />
                  </div>
                </div>
              )}
           </div>
        ))}
        
        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 border border-white/10 bg-white/5 rounded-sm text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">
            <ShieldCheck size={16} className="text-electric-teal" />
            Verified Infrastructure Intelligence // Ref: NB-MS-2027
          </div>
        </div>
      </div>
    </Section>
  );
};
