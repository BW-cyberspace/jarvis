// J.A.R.V.I.S. command center — data feed
// All copy shown in the HUD comes from this file.
window.JARVIS_DATA = {
  // Time-of-day salutation ("Good morning, sir.") is added live by the
  // dashboard — this is just the status tail spoken after it.
  greeting: "All systems nominal.",
  generated: "2026-07-30",

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

  // Real priorities are managed by voice and stored in the browser:
  //   "Jarvis, add priority <task>" / "remove priority 2" / "clear priorities"
  // Entries listed here are only defaults shown when none have been set.
  priorities: [],

  headline: "RETENTION UP 4.2% WEEK-OVER-WEEK — MARK VII TEARDOWN OUTPERFORMING BASELINE BY 31% — STRIPE SYNC DEGRADED — HELIX LABS PAYMENT PENDING",
  closer: "WHAT SHOULD I HANDLE FIRST?"
};
