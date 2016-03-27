---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base-core
lang: it
id: bitcoin-core-capacity-increases-faq
columns: 1
title: FAQ sugli Aumenti di capacità  — Bitcoin Core
breadcrumbs:
  - bitcoin
  - bcc
  - Capacity increases FAQ

moved_url: https://bitcoincore.org/it/2015/12/23/capacity-increases-faq/
---
# Domande frequenti sugli aumenti di capacità

1. Indice
{:toc}

## Quali tecnologie specifiche sono incluse nella roadmap, e per quando possiamo aspettarcele? {#roadmap-dates}

La nuova tecnologie verrà messa in campo quando sarà pronta e avrà
passato i test.
Comunque, pensiamo che la seguente sia una pianificazione ragionevole
per i miglioramenti specifici descritti nella [roadmap][]

| Dec 2015 | | Messa in campo di Segregated witness in testnet |
| Feb 2016 | 0.12.0 | [libsecp256k1 verification][] |
| Feb 2016 | | la funzionalità segregated witness è completata & pronta per la recensione generale|
| Mar 2016\* | 0.12.x | Messa in campo di OP_CHECKSEQUENCEVERIFY (BIPs [68][BIP68] & [112][BIP112]) + [BIP113][] as first [BIP9][] versionbits soft fork |
| April 2016\* |  0.12.x |  Messa in campo di segregated witness |
| 2016 | | Weak blocks, IBLTs, oppure entrambi |

\* Le date con l'asterisco rappresentano quelle in cui ci aspettiamo di rilasciare il codice pronto per un soft-fork. Il codice non sarà rilasciato fino a quando non è stato ben recensito, e l'effettivo fork richiederà tempo per essere attivato ([BIP66][] si attivò nel luglio 2015 dopo qualche mese; [BIP65][] si attivò nel dicembre 2015 dopo sole 5 settimane).


- **Segregated witness testnet:** Una testnet separata (non parte
  della testnet regolare) che fornisce un'opportunità ai contribtori di
  Bitcoin Core  di testare segregated witness (testimonianza segregata ndt) e
  agli sviluppatori di wallet di cominciare a lavorarci sopra.

- **Verifica [Libsecp256k1][]:** Aumento di velocità dal 500% to 700% su
  hardware x86\_64 durante la verifica per aiutare i full nodes a unirsi alla
  rete e per allegerire il peso dei nodi esistenti.

- **[OP\_CHECKSEQUENCEVERIFY][BIP112]:** miglioramento del 25,000% nell'
  [efficienza dei payment channels][payment channel efficiency] bi-direzioionali
  attraverso la possibilità per gli utenti di lasciare il canale aperto quanto
  lo desiderano.

- **[VersionBits][BIP9]:** aumenta il numero dei softforks che è possibile
  mettere in campo. Da 1 a 29 rilasci di nuove versioni simultaneamente, questo
  permette più veloci e più decentralizzati miglioramenti futuri del network.

- **[Segregated witness][bip-segwit]:** Aumento diretto di capacità dal 175%
  al 400%, miglioramento addizionale del 66% nell'efficienza dei canali
  bi-direzionali di pagamento attraverso il consolidamento delle operazioni
  di apertura e di chiusura del canale, la fine delle malleabilità di terze
  parti che pregiudicano la messa in campo degli smart contracts, le fraud
  proofs per permettere ai clients leggeri di contribuire in modo più efficace
  al rafforzamento delle verifiche di tipo economico, e la possibilità di
  migliorare il linguaggio di Scripting di Bitcoin in modo che nuovi e più
  potenti smart contracts possano essere concepiti.

- **IBLTs e weak blocks:** Diminuzione del 90% o maggiore della larghezza
  di banda critica necessaria per distribuire i blocchi creati dai miners
  che necessitano di essere propagati in fretta con un modesto
  [aumento della banda utilizzata][increase in total bandwidth], portando
  molti dei benefici del [Bitcoin Relay Network][] a tutti i full nodes.
  Questo miglioramento è ottenuto spalmando l'utilizzo della banda utilizzata
  dai full nodes nel tempo il che significa che IBLT e weak blocks potrebbero
  permettere aumenti più sicuri della massima dimensione del blocco.

## La segregated witness è equivalente a un soft fork che porta la massima dimensione del blocco a 4MB, a 2MB, a 1,75MB o cosa? Continuo a sentire cifre diverse.   {#segwit-size}

Nella [Proposta corrente][current proposal] per il soft fork segregated witness
(segwit) ogni byte del witness occupa 0.25 bytes corrispondenti
 nel computo dello spazio limite del blocco, il che significa che il limite
 massimo del blocco corrisponde teoricamente a poco meno di 4MB.

I blocchi però non sono costituiti solo da dati di witness e ciascun byte
non witness conta 1.00 bytes nei confronti del limite massimo del blocco,
per questa ragione i blocchi vicini ai 4MB di grandezza sono improbabili.

Secondo alcuni [calcoli][calculations] fatti da Anthony Towns, un blocco
pieno solamente di transazioni P2PKH a firma singola standard sarebbe circa
1.6MB e un blocco pieno solo di firme multiple 2-di-2 sarebbe di 2.0MB.

[current proposal]: https://youtu.be/fst1IK_mrng?t=2234
[calculations]: http://lists.linuxfoundation.org/pipermail/bitcoin-dev/2015-December/011869.html

## Segregated witness sembra complicata. Sarà pronto l'ecosistema per la sua messa in campo?  {#ecosystem-ready}

Alcune idee sono facili da spiegare ma difficili da realizzare. Altre idee
sono facili da realizzare ma difficili da spiegare. Segregated witness sembra
essere un'idea di quest'ultimo tipo.

Segwit può essere messa in campo in manera incrementale senza rompere la
compatibilità, per cui non è necessaria alcuna significativa preparazione da
parte dell'ecosistema. Gli sviuppatori che vogliono farsi un'esperienza
"sporcandosi le mani" possono cominciare a testare il loro software nella
testnet segwit che verrà messa in campo nel dicembre 2015.

Inizialmente solo i miners che vogliono supportarla dovranno fare l'upgrade
per attivarla e rafforzarla sulla mainnet. Le applicazioni esistenti dovranno
cambiare solo se vorranno approfittare delle nuove funzionalità.

Le transazioni Segregated witness esigeranno meno commissioni, potranno
usufruire di maggiori ottimizzazioni di performance, e potranno supportare gli
smart contracts multistage e i protocolli come i payment channels bi-direzionali
che possono permettere alla rete di scalare senza aggravio di ulteriori dati
per la Blockchain.
I wallet sono fortemente incoraggiati ad aggiornarsi ma possono continuare a
operare senza modifiche in quanto la messa in campo non rompe la conpatibilità
all'indietro.

## Segregated witness sembra ancora complessa. Perchè semplicemente non aumentare la dimensione massima del blocco? {#size-bump}

C'è un [unica riga di codice][max_block_size] in Bitcoin Core che dice che la
dimensione massima del blocco è di 1,000,000 di bytes (1MB). Il cambiamento
più semplice consisterebbe in un hard fork per aggiornare quella riga, per
esempio a 2,000,000 di bytes (2MB)

Gli Hard Forks tuttavia sono tutt'altro che semplici:

- **Non abbiamo esperienza:** I Miners, i negozianti, gli sviluppatori e gli
  utenti non hanno mai messo in atto un Hard fork, per questa ragione tecniche
  per farlo in modo affidabile non sono mai state testate.

    Questo a differenza dei soft forks, le cui messe in campo furono
    inizialmente gestite da Nakamoto, in quelle occasioni abbiamo raccolto
    abbastanza esperienza dalle complicazioni del [BIP16][], abbiamo
    raffinato la tecnica nella messa in campo del [BIP34][], e abbiamo
    acquisito sufficienti esperienze con i BIPs [66][BIP66] e [65][BIP65] per
    cominciare a gestire soft forks multipli in futuro con i bits di versione
    del [BIP9].

- **L'Upgrade è obbligatorio:** Gli Hard forks necessitano che tutti i nodi
  facciano l'upgrade. Compresi gli operatori dei nodi, se utilizzano
  questi per proteggere il loro wallet, come anche i client leggeri che
  ottengono i dati dai nodi.

- **Altri cambiamenti sono obbligatori:** Anche un cambiamento da una singola
riga di codice come quella che aumenta la dimensione massima del blocco ha
effetti su altre parti del codice, alcuni dei quali indesiderati. Ad esempio
oggi è possibile costruire una transazione che occupa quasi un 1MB di spazio e
che richiede 30 secondi o più su un computer moderno per essere validata (
blocchi contenenti transazioni del genere sono effettivamente stati minati).
Nei blocchi da 2MB, può essere costruita una transazione da 2MB che potrebbe
impiegare oltre 10 minuti per essere validata il che apre dei vettori di
attacco basati sul denial of service. Altre linee di codice dovrebbero essere
cambiate per prevenire questo tipo di attacchi.

Nonostante queste non indifferenti complessità, con le sufficienti
precauzioni, nessuna di queste complicazioni sembra fatale per un hard fork, e
noi ci aspettiamo in effetti di andare incontro ad hard forks in futuro. Con
Segregated Witness (segwit) però abbiamo un soft fork, simile ad altri soft
forks che abbiamo fatto in passato e coi quali abbiamo accresciuto le nostre
esperienze nella distribuzione e che ci fornisce in aggiunta molti benefici
permettendo che un maggior numero di transazioni sia aggiunta alla Blockchain.

Segwit non richiede cambiamenti ulteriori nella parte più alta degli strati
del software rispetto a un semplice aumento della misura massima del blocco,
ma se davvero vogliamo vedere scalare il Bitcoin, cambiamenti molto più
invasivi saranno necessari comunque, e segwit incoraggerà gentilmente la gente
a fare l'upgrade verso modelli più scalabili senza forzarli.

Gli sviluppatori, i miners, e la comunità hanno acquisito una significativa
esperienza mettendo in campo i soft forks, e noi crediamo che segwit può
essere messo in campo almeno altrettanto velocemente, e probabilmente in modo
più sicuro, rispetto ad un hard fork che aumenti la massima dimensione del
blocco.

## Ci sarà un hard fork prima o come parte della messa in funzione della segregated witness?   {#pre-segwit-fork}

No. Questo non è parte della [roadmap][].

[roadmap]: https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2015-December/011865.html

## Se ci sarà comunque un hard fork, perché non farlo adesso? {#why-not-now}

Abbiamo attualmente la capacità di aumentare la capacità del sistema attraverso
soft forks che hanno un vasto consenso senza le implicazioni di un hard fork,
come descritto in [una precedente domanda][q simple raise], per cui
l'aspettativa del fatto che ci sarà un hard fork in futuro non è una ragione
sufficiente per farlo ora.

Oltre a darci una maggiore capacità in termini di transazioni, i miglioramenti
proposti nella roadmap (combinati con altre tecnologie come i payment channels
bidirezionali) danno agli utenti la possibilità di ridurre la quantità di
spazio blockchain che usano mediamente---aumemntando in effetti la capacità
del sistema Bitcoin senza aumentare la quantità di banda utilizzata dai full
nodes.

Per esempio:

- [BIP68][] e [BIP112][] permettono ai payment channels bi-direzionali
  di stare aperti indefinitamente, il che ci aspettiamo riduca il numero
  di transazioni dei payment channels che devono essere confermate sulla
  blockchain.

- Segregated witness permette alla transazione di chiusura di un payment
  channel di combinarsi con una transazione di apertura di un altro payment
  channel riducendo lo spazio della blockchain utilizzato per cambiare
  canale di circa il 66%.

- Segregated witness permette ai soft forks di cambiare il Liguaggio Di
  Scripting del Bitcoin in modi che potrebbero ridurre la dimensione
  media di una transazione, per esempio utilizzando il
  public-key-recovery-from-signatures o le firme combinate Schnorr.

- Segregated witness permette la creazione di una fraud proof compatta che
  potrebbe sollevare il livello di sicurezza dei client leggeri a Verifica
  di Pagamento Semplificata (SPV) fino a un livello vicino a quello dei
  full nodes, il che potrebbe permettere alla rete di funzionare bene con
  un numero inferiore di full nodes rispetto a quanto avviene con la tecnologia
  attualmente in uso.

L'effetto reale di queste tecnologie è sconosciuto, ma scalare ora attraverso
un soft fork che gode di un largo consenso ci permette di ottenere i vantaggi
immediati, testare e misurare le potenzialità di medio termine, e usare questi
dati per i piani di lungo periodo.

## Come funzionerà la segregated witness per i wallets?  {#segwit-in-wallets}

I wallets che suppartano P2SH possono migrare completamente alla segregated
witness in due fasi:

- Phase 1: Gli scripts subiscono l'operazione di hash due volte, la prima a 256
  bits e poi a 160 bits. L'hash a 160 bits sarà compatibile con gli indirizzi
  P2SH esistenti, in questo modo i wallet saranno in grado di mandare e ricevere
  bitcoins a e da wallets attualmente esistenti.

- Phase 2: Gli script subiscono una sola operazione di hash a 256 bits.
  Questo formato non sarà compatibile con i wallets esistenti ma permetterà
  una più efficiente allocazione dello spazio nel blocco e offrirà una migliore
  sicurezza per merito di una migliore resistenza alla collisione.

## Se nessuno è obbligato a fare l'aggiornamento perchè ci si dovrebbe preoccupare di farlo? Ho sentito che il P2SH impiegò quasi due anni per essere adottato in maniera diffusa.  {#why-upgrade}

Ogni byte della parte witness di una transazione segregated witness (segwit)
occupa uno spazio corrispondente a soli 0.25 bytes in una transazione. Siccome
le commissioni della transazione sono basate sull'ampiezza della transazione,
questo è uno sconto effettivo del 75% sulle commissioni per quella parte di
transazione---ma solo per coloro che utilizzano segwit.

David Harding ha fornito una tabella dei [risparmi stimati][estimated savings]
a vari livelli di commissioni/transazioni. Da questa si rileva, che se la
commissione di una tipica transazione da 250-byte è di 0.01 USD, utilizzando
segwit si risparmieranno circa 0.003 USD quando spendiamo l'output di una
transazione P2PK-in-P2SH.

| Transazione | Bytes risparmiati | $0.01/250B | $0.05/250B | $0.25/250B | $1.00/250B |
|-------------|-------------|------------|------------|------------|------------|
| P2PK-in-P2SH |  79/107 | $0.003 | $0.015 | $0.079 | $0.316 |
| 1-of-1 P2SH multisig | 83/112 | $0.003 | $0.016 | $0.083 | $0.332 |
| 2-of-2 P2SH multisig | 163/219 | $0.006 | $0.032 | $0.163 | $0.652 |
| 2-of-3 P2SH multisig | 189/254 | $0.007 | $0.037 | $0.189 | $0.756 |

(Non ci aspettiamo che le commissioni raggiungano i livelli che vediamo in
tabella. Questi sono riportati solo per riferimento.)

I wallet web e gli exchanges che mandano grandi quantità di transazioni ogni
giorno a prezzo fisso (come per esempio gratis oppure con l'1% di commissione
a transazione) tenderanno ad essere early adopters--per loro anche il piccolo
risparmio per spesa riportato nella tabella sopra tende a raggiungere un
ammontare significativo se ripetuto centinaia o migliaia di volte in un giorno.

## Ho sentito che stavate compromettendo le transazioni a zero conferme. Quale tecnologia nella roadmap sulla scalabilità sta permettendo questo? {#rbf}

Nessuna di queste. in condizioni normali, la versione attuale di Core non
rimpiazzerà una transazione non confermata con un'altra transazione che spende
anche uno solo degli stessi inputs. Qualcuno pensa che questo voglia dire che
la prima transazione che si vedono spendere un particolare input sia sicura,
ma questo è falso (se fosse vero, non avremmo bisogno della blockchain.)

Questa attuale policy di default non implica che coloro i quali vogliono
aggiornare le loro transazioni non confermate non possano farlo.
La versione originale di Bitcoin forniva agli utilizzatori un modo per
annunciare che volevano aggiornare una transazione, ma Nakamoto dovette
disabilitarla nel 2010 per scongiurare attacchi di tipo denial-of-service.

Gli sviluppatori recenti del Bitcoin Core hanno capito che potevano prevenire
gli attacchi DOS esigendo che le transazioni aggiornate pagassero commissioni
extra e hanno ripristinato il meccanismo di Nakamoto per indicare quando una
transazione può essere rimpiazzata. Questa funzionalità è prevista per
la versione di Bitcoin Core 0.12.0 (gennaio/febbraio 2016) ma,
come la funzionalità originale di Nakamoto, è facoltativa e gli utenti che
vogliono essere in grado di rimpiazzare la loro transazione devono usare un
wallet che supporti questa funzione.

Attualmente non ci sono wallet che supportano questa funzione, ma i wallet
che la supporteranno in futuro potranno combinare insieme transazioni multiple
per ridurre lo spazio che queste occupano nella blockchain così come aumentare
le commissioni che pagano su transazioni che stanno impiegando molto tempo per
la conferma, evitando che le transazioni rimangano sospese (un problema di
usabilità noto).

## I weak blocks e IBLTs recano semplicemente "2016" nella pianificazione della roadmap. questo significa che non avete la minima idea di quando saranno disponibili?  {#weak-blocks-iblts}

[Weak blocks and IBLTs][] sono due tecnologie separate che sono ancora
[studiate intensamente][actively studied] per scegliere i giusti paramentri ma
il numero di sviluppatori che lavorano su di esse è limitato per questo è
difficile stimare quando saranno realizzate.

Weak blocks e IBLTs possono essere entrambe messe in campo come miglioramenti
di rete puri (non sono richiesti forks nè soft nè hard) il che significa che
ci sarà solo un breve lasso di tempo tra il completamento della fase di test al
momento in cui i loro benefici saranno disponibili a tutti i nodi che
avranno fatto l'upgrade. Noi speriamo che ciò avvenga nel corso del 2016.

Dopo la messa in campo, entrambi Weak Blocks e IBLTs potrebbero beneficiare
di un piccolo soft fork
([l'ordinamento canonico di transazione][canonical transaction ordering]), che
dovrebbe essere facile da attuare utilizzando il sistema versionbits del
[BIP9][] descritto altrove in questa FAQ.

[canonical transaction ordering]: https://gist.github.com/gavinandresen/e20c3b5a1d4b97f79ac2#canonical-ordering-of-transactions

## Perchè i miners dovrebbero adottare segwit, visto che non fornisce alcun risparmio di banda, storage, o tempo di processamento per loro? {#why-mine-segwit}

Neanche la maggior parte dei [soft forks precedenti][previous soft forks] ha
procurato ai miners benefici in questi termini. Ad esempio:

| [BIP16][]  (P2SH) | Nuovo tipo di transazione |
| [BIP30][] (duplicate txids) | Controllo richiesto per i txids duplicati |
| [BIP34][] (height in coinbase) | Ridotto lo spazio a disposizione del miner per la coinbase di 4 byte |
| [BIP65][] (OP_CLTV) | Nuovo opcode |

Il soft fork relativo al [BIP66][] (strict DER) che si attivò nel Luglio 2015
fornì immediatamente tempi di processamento ridotti rendendo possibile il
passaggio a libsecp256k1 per la validazione come descritto da qualche altra
parte in questa FAQ. La riduzione del tempo di verifica fa di questo
soft fork una gradita novità in quanto fornisce immediati vantaggi ai miners.

Ciò che fa Segregated Witness (segwit) è fornire vari benefici importanti
a chiunque lo utilizzi per creare transazioni:

Un rimedio permanente per la malleabilità che permette agli smart contracts
a più stage di fiorire, una lieve riduzione delle commissioni, facili
aggiornamenti futuri del Linguaggio di Scripting Bitcoin che permettono ai
wallet di avere accesso a nuove funzionalità.

Attraverso i soft forks e atraverso discussoni come quella della
[sessione dei miners][Miners' Panel] allo Scaling Bitcoin di Hong Kong, i
miners hanno ripetutamente dimostrato che vogliono che il Bitcoin sia il
più utile sistema possibile anche se non dovessero ricevere nessun beneficio
diretto da questo. Segwit e altri miglioramenti nella roadmap forniscono
significativi avanzamenti di usabilità.

In aggiunta, segwit permette ai miners di mettere più transazioni nei loro
blocchi il che permette di aumentare i loro ricavi per blocco minato.

## Come posso contribuire?

Comincia con il leggere la pagina del
[contributor di Bitcoin Core][Bitcoin Core contributor] su Bitcoin.org.
in particolare, la [revisione del codice][code review] è una parte critica nel
mettere in atto i soft fork.

Per ricevere suggerimenti specifici su come si può contribuire, unisciti
al canale IRC [#bitcoin-dev][].

[#bitcoin-dev]: https://webchat.freenode.net/?channels=bitcoin-dev&amp;uio=d4
[actively studied]: http://diyhpl.us/wiki/transcripts/scalingbitcoin/bitcoin-block-propagation-iblt-rusty-russell/
[bip-segwit]: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
[BIP9]: https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki
[BIP16]: https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki
[BIP30]: https://github.com/bitcoin/bips/blob/master/bip-0030.mediawiki
[BIP34]: https://github.com/bitcoin/bips/blob/master/bip-0034.mediawiki
[BIP50]: https://github.com/bitcoin/bips/blob/master/bip-0050.mediawiki
[BIP65]: https://github.com/bitcoin/bips/blob/master/bip-0065.mediawiki
[BIP66]: https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki
[BIP68]: https://github.com/bitcoin/bips/blob/master/bip-0068.mediawiki
[BIP112]: https://github.com/bitcoin/bips/blob/master/bip-0112.mediawiki
[BIP113]: https://github.com/bitcoin/bips/blob/master/bip-0113.mediawiki
[bitcoin core contributor]: /en/bitcoin-core/
[Bitcoin relay network]: http://bitcoinrelaynetwork.org/
[code review]: https://bitcoin.org/en/development#code-review
[estimated savings]: https://www.reddit.com/r/bitcoinxt/comments/3w1i6b/i_attended_scaling_bitcoin_hong_kong_these_are_my/cxtkaih
[increase in total bandwidth]: https://scalingbitcoin.org/hongkong2015/presentations/DAY1/3_block_propagation_1_rosenbaum.pdf
[libsecp256k1]: https://github.com/bitcoin/secp256k1
[libsecp256k1 verification]: https://github.com/bitcoin/bitcoin/pull/6954
[max_block_size]: https://github.com/bitcoin/bitcoin/blob/3038eb63e8a674b4818cb5d5e461f1ccf4b2932f/src/consensus/consensus.h#L10
[miners' panel]: https://youtu.be/H-ErmmDQRFs?t=1086
[payment channel efficiency]: https://scalingbitcoin.org/hongkong2015/presentations/DAY2/1_layer2_2_dryja.pdf
[previous soft forks]: https://github.com/bitcoin/bips/blob/master/bip-0123.mediawiki#classification-of-existing-bips
[weak blocks and iblts]: https://www.youtube.com/watch?v=ivgxcEOyWNs&t=1h40m20s
[q simple raise]: #size-bump
