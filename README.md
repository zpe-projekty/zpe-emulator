# ZPE Developer Toolkit - ZPE Emulator

Emulator umożliwia uruchamianie aplikacji ZPE w przeglądarce internetowej w celach deweloperskich i testowych.

Jest to składnik pakietu ZPE Developer Toolkit i może być używany do tworzenia, debugowania i testowania aplikacji ZPE bez potrzeby dostępu do platformy ZPE.

Więcej inforamcji na temat kożystania z emulatora znajdziesz w pakiecie ZPE Developer Toolkit - [ZPE Port](https://github.com/zpe-projekty/zpe-port/README.md).

# Uwagi

-   Szerokość kontenera applikacji deiniuje platforma. Wysokość kontenera jest dostosowywana dynamicznie w zależności od zawartości aplikacji. Pierwszy element bezpośrednio wewnątrz kontenera aplikacji (dziecko kontenera) powinien mieć zdefiniowaną wysokość.
-   Nie przykrywamy elementów platformy przez ustawianie z-index powyżej 1, ponieważ zakryje to elementy interfejsu platformy ZPE.
-   Zabronione jest zmienianie styli platformy ZPE poprzez nadpisywanie klas CSS.
-   Zabronione jest usuwanie elementów DOM platformy ZPE.
-   Zabronione jest resetowanie styli globalnych (np. `* { margin: 0; padding: 0; }`).
-   Zabronione jest wychodzenie poza obszar kontenera aplikacji
