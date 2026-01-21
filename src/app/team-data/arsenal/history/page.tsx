'use client';

import React from 'react';
import Image from 'next/image';

export default function HistoryPage() {
  return (
    <main className="max-w-5xl mx-auto bg-white p-6">
      <h2 className="text-2xl font-semibold text-red-800 mb-2">
            Foundations
          </h2>
      <article className="space-y-8 text-gray-800">
        <section>
          <p>
            Founded in 1886, Arsenal Football Club has evolved from a group of cannon makers
            in South London into one of the most prestigious sporting institutions in the world.
            Known as The Gunners, the club’s history is defined by innovation, consistency,
            and a commitment to The Arsenal Way.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-red-800 mb-2">
            Origins and the Move North (1886–1925)
          </h2>
          <p>
            The club was formed by workers at the Royal Arsenal armament factory in Woolwich.
            Originally named Dial Square, they played their first match against Eastern Wanderers
            on December 11, 1886. Shortly after, they renamed themselves Royal Arsenal, later
            becoming Woolwich Arsenal upon turning professional.
          </p>
          <p>
            The club struggled with geographic isolation in South London, leading to low attendance.
            In 1913, under the ambitious chairmanship of Sir Henry Norris, the club made the controversial
            move across the River Thames to Highbury (Arsenal Stadium) in North London. Dropping Woolwich
            from their name, they became simply Arsenal. This move cemented their identity and sparked
            a fierce, century-long rivalry with neighbors Tottenham Hotspur.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-red-800 mb-2">
            The Chapman Era: Innovation and Dominance (1925–1934)
          </h2>
          <p>
            The appointment of Herbert Chapman in 1925 changed the trajectory of the club forever.
            Chapman was a visionary who modernized every aspect of the game:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Tactics:</strong> He perfected the WM formation.</li>
            <li><strong>Aesthetics:</strong> He added white sleeves to the red kit and pioneered numbered shirts.</li>
            <li><strong>Infrastructure:</strong> He lobbied for the renaming of the local tube station to Arsenal.</li>
          </ul>
          <p>
            Under Chapman, Arsenal won their first major trophy, the FA Cup, in 1930, followed by league titles
            in 1931 and 1933. Though Chapman died suddenly in 1934, his foundation allowed the club to dominate
            the 1930s, winning five league titles and two FA Cups in a single decade.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-red-800 mb-2">
            Post-War Resurgence and the Double (1947–1980)
          </h2>
          <p>
            After the hiatus of World War II, Arsenal found success under Tom Whittaker, winning titles in 1948 and 1953.
            However, the subsequent years were characterized by a trophyless wilderness.
          </p>
          <p>
            The drought ended in 1970 when Arsenal won their first European trophy, the Inter-Cities Fairs Cup.
            This was followed by the historic 1970-71 season, where the club achieved the Double—winning both
            the League Championship and the FA Cup in the same year. The winning goal in the FA Cup Final by
            Charlie George remains one of the most iconic moments in the club’s folklore.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-red-800 mb-2">
            The George Graham Years (1986–1995)
          </h2>
          <p>
            Former player George Graham returned as manager in 1986, instilling discipline and defensive solidity
            encapsulated by the Famous Back Four (Adams, Dixon, Winterburn, and Bould).
          </p>
          <p>
            Graham’s tenure is most remembered for the 1988-89 season. In the final game of the year, Arsenal needed
            to beat Liverpool by two clear goals at Anfield to win the title. In the dying seconds, Michael Thomas
            scored to make it 2-0, securing the championship in the most dramatic fashion in English football history.
            Graham also led the club to a Cup Double in 1993 and the European Cup Winners Cup in 1994.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-red-800 mb-2">
            The Arsène Wenger Revolution (1996–2018)
          </h2>
          <p>
            In 1996, a relatively unknown Frenchman, Arsène Wenger, took the helm. He transformed the club through
            scientific dieting, global scouting, and an emphasis on fluid, attacking football.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>The Second and Third Doubles:</strong> Wenger secured Doubles in 1997-98 and 2001-02.</li>
            <li><strong>The Invincibles (2003-04):</strong> Arsenal went an entire 38-game Premier League season undefeated.</li>
            <li><strong>The Move to Emirates:</strong> In 2006, the club left Highbury for the Emirates Stadium.</li>
          </ul>
          <p>
            Wenger kept the club in the Champions League for 20 consecutive seasons and won a record-breaking seven FA Cups personally.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-red-800 mb-2">
            The Modern Era (2018–Present)
          </h2>
          <p>
            Following Wenger’s departure in 2018 and a brief transitional period under Unai Emery,
            former club captain Mikel Arteta was appointed manager in 2019. Arteta has overseen a significant
            cultural shift, focusing on a young, dynamic squad. Under his leadership, the club has returned
            to title contention, challenging the dominance of Manchester City and re-establishing Arsenal as
            a powerhouse in the Champions League.
          </p>
        </section>
      </article>
      <section className="mt-12">
  <h2 className="text-2xl font-semibold text-red-800 mb-4">Trophy Record</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
      <thead className="bg-red-100">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-medium text-red-800">Trophy</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-red-800">Count</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-red-800">Most Recent</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y text-black divide-gray-200">
        <tr>
          <td className="px-4 py-2">First Division / Premier League</td>
          <td className="px-4 py-2">13</td>
          <td className="px-4 py-2">2003–04</td>
        </tr>
        <tr>
          <td className="px-4 py-2">FA Cup</td>
          <td className="px-4 py-2">14 (Record)</td>
          <td className="px-4 py-2">2019–20</td>
        </tr>
        <tr>
          <td className="px-4 py-2">League Cup</td>
          <td className="px-4 py-2">2</td>
          <td className="px-4 py-2">1992–93</td>
        </tr>
        <tr>
          <td className="px-4 py-2">European Cup Winners Cup</td>
          <td className="px-4 py-2">1</td>
          <td className="px-4 py-2">1993–94</td>
        </tr>
        <tr>
          <td className="px-4 py-2">Inter-Cities Fairs Cup</td>
          <td className="px-4 py-2">1</td>
          <td className="px-4 py-2">1969–70</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

    </main>
  );
}
