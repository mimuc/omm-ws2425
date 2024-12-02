const x = 5;

function joinString (x: string[]): string { return "Hallo"  }

// There are    interfaces in TS
interface Engine {
    horsePower: number;
    ignite (): number;
}

// Classes can   have member-visibility
class Car {
    private engine: Engine;
    public start (): void {  }
}
