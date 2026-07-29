// J.A.R.V.I.S. command center — data feed
// All copy shown in the HUD comes from this file.
window.JARVIS_DATA = {
  greeting: "Good evening, sir. All systems nominal.",
  generated: "2026-07-29",

  connectors: [
    { name: "GMAIL",          status: "online"  },
    { name: "CALENDAR",       status: "online"  },
    { name: "DRIVE",          status: "online"  },
    { name: "YOUTUBE STUDIO", status: "online"  },
    { name: "STRIPE",         status: "offline" },
    { name: "DISCORD",        status: "online"  }
  ],

  content: {
    funnel: [
      { label: "IMPRESSIONS",   value: "2.4M",   pct: 100 },
      { label: "VIEWS",         value: "812K",   pct: 72  },
      { label: "AVG RETENTION", value: "46%",    pct: 46  },
      { label: "CLICK-THROUGH", value: "6.8%",   pct: 34  },
      { label: "NEW SUBS",      value: "12,480", pct: 58  }
    ]
  },

  sponsors: [
    { name: "NORDLOCK VPN", amount: 6000, status: "paid"        },
    { name: "HELIX LABS",   amount: 4200, status: "payment_due", due: "FRI" },
    { name: "AURORA GEAR",  amount: 2800, status: "negotiating" }
  ],

  priorities: [
    "Reply to Helix Labs — contract redlines expire Friday",
    "Thumbnail A/B test on \"Mark VII teardown\" ends 18:00",
    "Stripe connector offline — payouts not syncing",
    "Record VO for Thursday upload, script locked",
    "Community post queued — approve before 21:00"
  ],

  headline: "RETENTION UP 4.2% WEEK-OVER-WEEK — MARK VII TEARDOWN OUTPERFORMING BASELINE BY 31% — STRIPE SYNC DEGRADED — HELIX LABS PAYMENT PENDING",
  closer: "WHAT SHOULD I HANDLE FIRST?"
};
