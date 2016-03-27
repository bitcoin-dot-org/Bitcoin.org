---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base-core
lang: es
id: bitcoin-core-2016-01-07-statement
columns: 1
title: Declaración de Bitcoin Core -- 2016-01-07
breadcrumbs:
  - bitcoin
  - bcc
  - 2016-01-07 Statement

moved_url: "https://bitcoincore.org/es/2016/01/07/declaraci%C3%B3n/"
---
# Declaración de Bitcoin Core

Bitcoin es una «versión peer-to-peer de efectivo electrónico que permite mandar pagos online directamente entre personas sin necesidad de utilizar una institución financiera». Nuestra visión para Bitcoin es aumentar la flexibilidad del sistema para que funcione eficientemente a escala masiva mientras manteniendo la seguridad y las propiedades básicas de decentralización que distinguen a Bitcoin.

Creemos que Bitcoin puede lograr esto mediante el establecimiento de una base sobre la cual se pueden construir capas adicionales al protocolo y interfaces con otros sistemas. Además, nuestras metas a largo plazo incluyen proteger y mejorar la privacía de usuarios de Bitcoin.

«Bitcoin Core» se refiere a un proyecto de software de código abierto que es descendiente directo de la implementación original de Bitcoin. Como contribuyentes al proyecto, mantenemos y lanzamos software para la consideración de la comunidad de Bitcoin. Esforzamos para hacer mejoras a las reglas del consenso a base de proponer actualizaciones que creemos que tienen sentido técnico basado en nuestro entendimiento de las metas de Bitcoin y que creemos que tienen buena probabilidad de soporte y adopción masivo.

Cambios a las reglas del consenso de Bitcoin se pueden realizar a través de soft forks o hard forks (ver el Apéndice A). Soft forks permiten cambios compatibles. Con soft forks, software viejo y nuevo puede coexistir en el network. Soft forks pueden introducir nuevas funciones sin disrupción porque los usuarios que quieren utilizarlas pueden actualizarse mientras los que no quieren pueden seguir normalmente.

Hard forks rompen compatibilidad de todo el software de Bitcoin anterior y requieren que todos los participantes se actualizen a las mismas reglas por dada fecha o arriesguen pérdida financiera. Estos eventos pueden dañar los efectos de red, echando para afuera a usuarios si no toman acción y potencialmente rompiendo software y aplicaciónes dependientes del sistema.

Por estas razones, Bitcoin Core fuertemente favorece compatibilidad y cree que cada usuario debe poder elegir no actualizar las reglas de su software de Bitcoin. Casi cualquiera función nueva se puede agregar con soft fork. A veces hard forks pueden tener beneficios, y si hay acuerdo casi universal, estos beneficios pueden superar a las desventajas. Excepto para estos casos, soft forks serán preferidos. Creemos que esto es en el mejor interés de los usuarios actuales y futuros del sistema.

También se espera que a la medida que el ecosistema de Bitcoin vaya creciendo, el número de implementaciones alternativas del protocolo de Bitcoin aumentará. Es inevitable que otros proyectos hagan propuestas radicalmente diferentes a las nuestras para la consideración de la comunidad. Al fin de cuentas, los desarrolladores de Bitcoin Core no decide las reglas del consenso de Bitcoin. Sino, los usuarios que participan en Bitcoin eligen cual software usar. Por esto, el software de Bitcoin Core intencionalmente excluye función de actualización automática. Su omisión asegura la participación voluntaria de todos en cada cambio para que todos siempre tengan libre la opción de cual software usar.
 
## Apéndice A

Un hard fork es un cambio en las reglas del consenso en el cual bloques inválidos bajo las reglas viejas podrán ser válidos bajo las nuevas reglas.

Un soft fork es un cambio en las reglas del consenso en el cual bloques válidos bajo las reglas viejas podrán ser inválidos bajo las nuevas reglas pero todos los bloques inválidos bajo las reglas viejas siguen siendo inválidos bajo las nuevas reglas.
