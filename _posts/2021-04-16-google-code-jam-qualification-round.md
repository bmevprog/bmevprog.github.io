---
layout: post
title: Google Code Jam 2021 - Qualification Round
date: 2021-04-16 12:00:00 +0100
summary: Pár hete zajlott le a 2021-es Google Code Jam Qualification Round-ja!
categories: [versenyek]
keywords: google, codejam
tags:
 - google
 - codejam
math: true
---

Pár hete zajlott le a 2021-es Google Code Jam [Qualification Round](https://codingcompetitions.withgoogle.com/codejam/round/000000000043580a)-ja! Ennek a fordulónak a hossza 30 óra, így bármelyik időzónában is élünk a világban, bőven van 1 teljes napunk megoldani a feladatokat. A továbbjutáshoz 30 pontot kell szerezni, ennek az összeszedéséhez a szokásos módon nem volt szükség az összes feladat megoldására.

Az idei feladatsor a következő volt:

- [Reversort](https://codingcompetitions.withgoogle.com/codejam/round/000000000043580a/00000000006d0a5c) (7 pont)
- [Moons and Umbrellas](https://codingcompetitions.withgoogle.com/codejam/round/000000000043580a/00000000006d1145) (5, 11, 1 pont)
- [Reversort Engineering](https://codingcompetitions.withgoogle.com/codejam/round/000000000043580a/00000000006d12d7)  (7, 11 pont)
- [Median Sort](https://codingcompetitions.withgoogle.com/codejam/round/000000000043580a/00000000006d1284) (7, 11, 10 pont)
- [Cheating Detection](https://codingcompetitions.withgoogle.com/codejam/round/000000000043580a/00000000006d1155) (11, 20 pont)

Nézzük meg, hogy hogyan lehetett továbbjutni a következő fordulóba!

## 1\. Feladat: Reversort

### Feladatkiírás

A Reversort egy olyan algoritmus, ami egy listát tud növekvő sorrendbe állítani, a "Reverse" operáció használatával.

Ez az operáció a listának egy összefüggő részét tudja megfordítani, a következő pszeudokód alapján:

(A tömbök indexelése 1-től kezdődik.)

```
Reversort(L):
  for i := 1 to len(L) - 1
    j := L[i..]-ben a minimum érték indexe
    Reverse(L[i..j])
```

A fenti kód végigiterál a tömbön és minden lépésben az aktuális pozíción lévő számot kicseréli a még hátralévő tömbben lévő minimális számmal, mindezt úgy, hogy a közöttük lévő számokat is fordított sorrendbe teszi, tehát megfordítja ezt az egész listarészt.

Látható, hogy az iteráció végén a tömbben lévő számok növekvő sorrendben fognak állni.

Ez az algoritmus eléggé pazarló, a feladat az, hogy kiszámoljuk hogy mennyire. A bemeneten kapunk egy listát, össze-vissza sorrendben, nekünk pedig össze kell adni (az erre lefuttatott algoritmusban) iterációnként a megfordított listák hosszait és ezt az összeget kiírni a kimenetre.

### Megoldás

Egyetlen teszthalmaz van, ami rögtön látszik rajta, hogy nagyon kicsi: T=100 db teszteset, legfeljebb N=100 db számmal a listában. Ha a fenti algoritmust megnézzük, nagy vonalakban ~N-szer hajtja végre a ciklust, belül a minimum megtalálása ~N lépés, a string megfordítása szintén ~N lépés, tehát ~2\*N^2=2\*10^4 lépésben fut. Fontos tudni, hogy 1 mp körülbelül 10^7 ~ 10^8 db utasításnak felel meg programozási versenyeken, tehát bőven 1 mp alatt vagyunk. A teszthalmazra 10 mp time limit van és 1 GB memóriát használhatunk, mindkettőbe bele fogunk férni ha csak lekódoljuk a fenti pszeudokódot.

Érdemes tehát ezt a feladatot megcsinálni, mert:

- 7 pontot ad, ez a 30-ból elég sok.
- Csak a megadott pszeudokódot kell egy konkrét programozási nyelvre lefordítani, várhatóan gyorsan elkészülünk.
- Azonnal látható az eredményünk (Visible Verdict), biztosan tudhatjuk hogy megkaptuk a 7 pontot.
- A feladat szövege írja, hogy egy későbbi feladat ehhez nagyon hasonló, lehet hogy 2 legyet ütünk egy csapásra ha foglalkozunk most ezzel.

Nyelvnek a Pythont választottam a tömörsége és a pszeudokódhoz hasonló szintaxisa miatt. Programozási versenyeken C++ és Python között szoktam választani, attól függően hogy mennyire szűk az időkorlát a teszteseteken. Itt most nem volt az, ezért jó választás a Python.

A következő kódot adtam be (a kommentek nélkül):

```python
n = int(input()) # Input 1. sora: tesztesetek száma
for n_i in range(n):
  cost = 0
  m = int(input()) # Teszteset 1. sora: lista hossza
  l = list(map(int, input().split(' '))) # Teszteset 2. sora: maga a lista
  # Itt kezdődik a Reversort
  for i in range(m-1):
    j = l.index(min(l[i:m])) # Legkisebb elem megkeresése a hátralévő tömbben.
    cost += j-i+1 # Résztömb hosszának hozzáadása a végleges költséghez.
    l[i:j+1] = reversed(l[i:j+1]) # Résztömb megfordítása.
  print(f"Case #{n_i+1}: {cost}") # Eredmény kiírása megfelelő formátumban.
```

Látszik, hogy a Reversort pszeudokódját szinte csak le kellett fordítani Python nyelvre és készen is volt a feladat. Az indexekkel kellett csak egy kicsit küzdeni, mire kijöttek jól (tanulság: Pythonban minden beépített függvénynél balról zárt, jobbról nyílt az összes intervallum), illetve a list.index és a reversed függvényt eddig nem ismertem, ezekre rá kellett keresni.

Ezzel szereztünk 7 pontot, még 23 pontra van szükségünk.

## 2\. Feladat: Moons and Umbrellas

### Feladatkiírás

A sztoritól eltekintve annyi a feladat, hogy kapunk egy stringet, ami C, J illetve ? karaktereket tartalmaz, a ? karakterek helyére kell úgy C és J karaktereket írni, hogy a kapott stringben a lehető legkevesebb legyen a CJ és a JC részstringek darabszámának a súlyozott összege. A CJ-k darabszámát X-el, a JC-k darabszámát Y-al súlyozzuk, ezeket a paramétereket szintén az inputon kapjuk meg.

### Megoldás

A három teszthalmazból az 1. (5 pontért) nagyon pici, legfeljebb 10 hosszú lehet a string, itt a max ~2^10 db összes esetet is végig tudnánk próbálgatni. Ha olyan helyzetben lennénk, hogy a többi feladat közül már megoldottunk párat és pont ez az 5 pont hiányzik a 30-ból, akkor itt érdemes ennyit lekódolni és nem foglalkozni a többi tesztesettel.

A 2. teszthalmaz (11 pontért) már legfeljebb 1000 hosszú stringeket tartalmaz, a 2^1000 db eset (2^4 = 16 > 10) alulról becsülve 10^250 darab lenne, ami még akkor is nagyon sok ha 1 lépésben végezni tudnánk 1-1 esettel. Itt már nem lehet brute force algoritmust adni, hanem gondolkozni is kell, viszont 11 pontért érdemes lehet foglalkozni vele.

A 3. teszthalmaz (1 pontért) azonban nagyon nem szimpatikus. Csak 1 pontot ér, de a súlyok között negatív értékek is megjelenhetnek, amiket teljesen ellentétes módon kell kezelni (maximalizálni kell a darabszámot minimalizálás helyett), a stringek hossza szintén 1000, tehát brute force algoritmust sem adhatunk és mindemellett még Hidden Verdict-es is, tehát nem is fogjuk tudni azonnal, hogy sikerült-e. Ez az a teszteset amivel nem érdemes foglalkozni, csak ha a 2. teszthalmaz megoldása közben eszünkbe jut valami gyors erre is, egyébként csak az időnket vesztegetnénk.

Az első két teszthalmazra a következő Python kódot adtam be:

```python
n = int(input())
for n_i in range(n):
  x, y, m = input().split()
  x = int(x)
  y = int(y)
  m = m.replace('?', '')
  xc = m.count('CJ')
  yc = m.count('JC')
  print(f"Case #{n_i+1}: {x*xc + y*yc}")
```

Ha minimalizálni szeretnénk a CJ-k és a JC-k darabszámát, akkor tulajdonképpen a váltakozásokat szeretnénk minimalizálni. Ha egyszerűen végigmegyek balról-jobbra a stringen és minden ? helyére beírom a tőle balra lévő karaktert (aki már nem lehet ?, mert az előző lépésben biztosan átírtam), illetve ha ? sorozattal kezdődik a string, akkor azok helyére balról az első nem-? karaktert, akkor pont egy ilyen minimalizált megoldást kapok. Ebben a C-kből és J-kből álló stringben kell megszámolni a CJ és JC részstringeket és kiírni a súlyozott összeget: ez egy jó megoldás lenne.

Viszont ennél sokkal egyszerűbb csak törölni a ?-eket, hiszen a fenti módszer csak annyit csinál, hogy a ?-ek helyére "elcsúsztatja" valamelyik oldalról az első nem ? karaktert, tehát új váltakozást nem fog bevezetni, csak a meglévőket húzza össze egymás mellé.

Például ezt az input stringet:

`???JC??C??JCJ`

Erre fogja átírni:

`JJJJCCCCCCJCJ`

De ebben pont ugyanannyi CJ és JC van, mint a kérdőjelek törlésével kapott stringben:

`JCCJCJ`

Ezt viszont egy kicsit könnyebb programozottan kiszámolni az inputból (`m.replace('?', '')`).

Nyelvnek pedig itt szintén érdemes a Pythont választani, mert tömör és mert 10 mp-ünk van teszthalmazonként, ami bőven elég a fenti program lefuttatására.

Ezzel szereztünk összesen 16 pontot, még 7 pontra van szükségünk.

## 3\. Feladat: Reversort Engineering

### Feladatkiírás

Ez az a feladat ami ugyanúgy indul mint a Reversort, azonban most felcserélődnek a szerepek: most az inputon kapjuk meg a lista hosszát és a costot és nekünk kell adni egy olyan listát aminek a sorrendezése ennyibe fog kerülni a Reversort használatával (vagy kiírni, hogy IMPOSSIBLE ha ilyet nem lehet).

### Megoldás

Az első teszthalmaznál a lista hossza legfeljebb 7 lehet. Ez azért nagyon kényelmes, mert a 7!=5040 lehetséges sorrendet végig tudjuk próbálgatni egyesével, mindegyiken lefuttatni az 1. feladatra adott megoldásunkat és ahol az ottani cost egyezik az inputon megadottal, azt a sorrendet kiírni. Ha nincs ilyen, akkor pedig azt, hogy IMPOSSIBLE. Ez a teszthalmaz 7 pontot ér, nekünk pont ennyire van szükségünk, ezért ezzel a megoldással tulajdonképpen készen is vagyunk, itt befejezhetjük a versenyt.

A második teszthalmaz már nehezebb, itt legfeljebb 100 lehet a lista hossza, 100! esetre már biztosan nem fog a brute force algoritmus időben lefutni. Mivel még volt elég sok idő vissza a versenyből, ezért úgy döntöttem, hogy kíváncsiságból megpróbálom ezt a teszthalmazt is megoldani.

A megoldás kulcsa az, hogy visszafele gondolkozunk: kiindulunk a végeredményből, az N hosszú rendezett listából, visszafele iterálunk rajta és lépésenként "visszaforgatunk" benne általunk választott hosszúságú résztömböket, amíg el nem érünk a kiindulási, összekevert listába. Ha úgy választjuk meg a résztömbök hosszait, hogy azoknak az összege pont kiadja a costot, akkor a kapott kiindulási tömb a megoldás lesz. (Meg itt persze menet közben észre kell venni, ha lehetetlen a feladat.)

Az első megfigyelés az az, hogy minden lépésben legalább 1 costot el fogunk használni, mivel azt írja a feladat, hogy ha pont az aktuális pozíción van a legkisebb elem, akkor is "megfordítjuk" azt az egyelemű részt. Mivel ez az n-1 db pozíción biztosan fel fog merülni költségként, ezért érdemes ezt már az elején levonni (lekönyvelni), hogy a további számolások során ne történhessen meg az, hogy minden costot elhasználtunk de még nem értünk el a lista elejére.

Ennek a következménye, hogy a k hosszú lista megfordításának költsége innentől kezdve k-1 lesz, mert azt az 1-et már lekönyveltük.

A következő megfigyelés pedig az, hogy hátulról visszafele adott pozíciókban a következő costokból választhatok:

(Itt a tömböt 0...n-1 -el indexeljük, a Reversort a tömb utolsó elemére nem fut le, ezért visszafele az n-2. indexnél kezdünk.)

- n-2. index: 0, ha az n-2. elemet helyben forgatom és 1, ha az n-2. és n-1. elemeket megcserélem.
- n-3. index: 0,1,2, hasonlóan.
- n-4. index: 0,1,2,3, hasonlóan.

...

- 0. index: 0,1,...,n-1.

A feladat tehát az, hogy a megadott costot rakjuk össze összegként úgy, hogy a fenti lépésekben mindenhol 1 számot választhatunk. Mivel minden lépésben tudunk bármilyen kicsi számot választani, ezért jó stratégia minden iterációban a maximumot választani, hogy minnél jobban csökkenjen a cost, kivéve ha azzal túllőnénk. Amennyiben a listában szereplő maximális érték már több, mint a hátralévő cost, akkor a cost-al egyenlő értéket választjuk ki a listából (ilyen biztosan van), a hátralévő iterációkban pedig mindig 0-t.

Ezt az algoritmust implementáltam Pythonban:

```python
# Input 1. sora: tesztesetek száma.
z = int(input())
for z_i in range(z):
  # Teszteset 1. sora: elvárt lista hossza, elvárt cost értéke.
  n, c = map(int, input().split(' '))
  
  # Itt gyorsan kizárjuk a lehetetlen eseteket:
  
  # Tudjuk, hogy a minimális cost n-1, ha ennél kevesebb a cél,
  # akkor az lehetetlen.
  if c < n-1:
    print(f"Case #{z_i+1}: IMPOSSIBLE")
    continue
  # A maximális cost minden lépésben a legnagyobb számot választani,
  # ami az N,...,2 számok összege (1 nincs, mert az utolsó elemre
  # nem fut le a Reversort).
  if n*(n+1)/2-1 < c:
    print(f"Case #{z_i+1}: IMPOSSIBLE")
    continue
  # A teszthalmazok leírásában benne van, hogy 2<n, ez itt felesleges,
  # csak nem vettem észre.
  if n == 1:
    print(f"Case #{z_i+1}: 1")
    continue
  # Ezen a ponton biztosan van megoldás:
  # Lekönyveljük a biztos n-1 költséget.
  c -= (n-1)
  
  # Itt először előre kiszámolom a costokat (ez egyébként nem szükséges,
  # menet közben is lehetne):
  
  # Ebben fogom tárolni, hogy az adott kezdőindexhez hol van a forgatandó
  # résztömb vége.
  torev = list(range(n))
  # Itt előrefele megyek, majd a forgatásos ciklusban szükséges csak
  # visszafele menni.
  for i in range(n-1):
    # Itt kiszámolom, hogy ebben a körben mennyi costot tudok elkönyvelni
    # (vagy a leghosszabb lehetséges résztömb hosszát, vagy ha az túl sok,
    # akkor a teljes hátralévő costot el tudom könyvelni).
    j = min(n-1-i, c)
    # Elmentem hol van a forgatott résztömb vége. Itt a +1/-1-eken kell
    # egy kicsit agyalni, de így jön ki jól.
    torev[i] = i + j
    # Csökkentem a costot az ebben az iterációban elkönyvelt értékkel.
    c -= j
    
  # Itt pedig visszafele lejátszom a fent kiszámolt forgatásokat és
  # legenerálom a kiindulási tömböt:
  
  # Kiindulunk az n hosszú rendezett listából.
  l = list(range(1,n+1))
  # i=n-2...0
  for i in range(n-2,-1,-1):
    # Forgatandó lista vége.
    j = torev[i]
    # Még több +1/-1 fejfájás.
    l[i:j+1] = reversed(l[i:j+1])
    
  # Eredmény kiírása:
  
  st = " ".join(map(str, l))
  print(f"Case #{z_i+1}: {st}")
```

Itt sokféleképpen lehetne számolni, tulajdonképpen az n-1 előre lekönyvelése sem szükséges, menet közben is észre lehetne venni ha kifogytunk a megengedett costból. Ezen a kódon még sokat lehetne egyszerűsíteni. :)

Ezzel szereztünk összesen 18 pontot, a többi feladattal együtt ez 41 pont. Minden teszthalmaz, amit beküldtünk Visible Verdict-es volt, ezért biztosak lehetünk benne, hogy be is jutottunk a következő fordulóba!

A forráskódok (kommentezés nélkül) megtalálhatóak a [versenyprogramozas/solutions](https://github.com/versenyprogramozas/solutions/tree/master/google/codejam/2021/00_qualification_round) reposiositoryban.
