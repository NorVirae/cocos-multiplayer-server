import { Room, Client } from "colyseus";
import { Schema, MapSchema, type } from "@colyseus/schema";

export class Player extends Schema {
    @type("number")
    x: number = 0.11;

    @type("number")
    y: number = 2.22;

    @type("number")
    score: number = 0;

    @type("boolean")
    pauseGame: boolean = false;

    @type("number")
    highestScore: number = 0;
}

export class State extends Schema {
    @type({
        map: Player,
    })
    players = new MapSchema<Player>();
}

export class RaceRoom extends Room<State> {
    onCreate(options: any) {
        this.setState(new State());

        this.onMessage("fly", (client, data) => {
            const player = this.state.players.get(client.sessionId);
            player.x = data.x;
            player.y = data.y;
            player.score = data.score;

            console.log(this.state, player.x);
            this.broadcast("fly", data, { except: client });
        });

        this.onMessage("results", (client, data) => {
            const player = this.state.players.get(client.sessionId)
            player.pauseGame = data.pauseGame
            player.highestScore = data.highestScore
            this.broadcast("results", data, {except: client})
        })
    }

    onJoin(client: Client, options) {
        this.state.players.set(client.sessionId, new Player(2, 4));
    }

    // onAuth(client: Client, options) {
    //     if (options.mode === "duo") {
    //         console.log(options);
    //     }
    // }

    // onLeave(client: Client, options) {
    //     if (options.mode === "duo") {
    //         console.log(options);
    //     }
    // }

    // onDispose() {
    // }
}
