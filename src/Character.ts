import { Weapon } from "./Weapon";

export abstract class Character 
{
    public readonly name: string;
    public readonly maxHealth: number;
    public readonly baseAttack: number;
    public readonly baseDefence: number;
    private  _health: number;
    private  _weapon: Weapon | null;

    public constructor(name: string, health: number, baseAttack: number, baseDefense: number)
    {
        if (health <= 0) 
        {
            throw new Error(`The health of ${name} must be strictly positive.`);
        }

        this.name = name;
        this.maxHealth = health;
        this.baseAttack = baseAttack;
        this.baseDefence = baseDefense;
        this._health = health;
    }

    public get health(): number
    {
        return this.health;
    }

    public abstract getAttack(): number

    public abstract canEquip(weapon: Weapon): boolean

    protected getWeaponAttackBonus(): number
    {
        return this._weapon.attackBonus;
    }

    public isAlive(): boolean
    {
        if (this.health > 0 ) 
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public describe(): string
    {
        return `${this.name} - health ${this.health}/${this.maxHealth} - attack ${this.getAttack} - defnece ${this.baseDefence} - weapon ${this._weapon.name}`;
    }
    
    public takeDamage(amount: number): void 
    {
        this._health = this.health - amount;
    }

    public heal(amount: number): void
    {
        this._health = this.health - amount;
        if (this.health > this.maxHealth) 
        {
            this._health = this.maxHealth;
        }
    }

    protected computeDamage(target: Character): number
    {
        return this.getAttack - target.baseDefence;
    }

    public attack(target: Character): number
    {
        if (this.health <= 0) 
        {
            throw new Error(`${this.name}is KO and cannot attack.`);
        }

        if (target.name === this.name) 
        {
            throw new Error(`${this.name}cannot attack themselves.`);
        }

        if (target.health <= 0) 
        {
            throw new Error(`${target.name}is already KO.`);
        }

        console.log (`${this.name} hits ${target.name} for ${this.getAttack} damage (${target.name}: ${target.health}/${target.maxHealth}).`);

        if (target.health <= 0) 
        {
            console.log(`${target.name}is KO!`);
        }

        return this.computeDamage;
    }

}

