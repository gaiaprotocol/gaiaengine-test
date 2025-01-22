import { BitmapTextNode } from "@gaiaengine/2d";

export default class DamageTextNode extends BitmapTextNode {
  private velocityY = -50;
  private gravity = 100;
  private lifetime = 1.0;
  private elapsed = 0;
  private fadeStart = 0.5;
  private initialScale = 1.0;
  private targetScale = 1.2;

  constructor(x: number, y: number, damage: number) {
    super(x, y, damage.toString(), {
      fnt: "/assets/bitmap-fonts/white-peaberry.fnt",
      src: "/assets/bitmap-fonts/white-peaberry.png",
    });

    this.alpha = 1;
    this.scale = this.initialScale;
  }

  protected update(deltaTime: number): void {
    super.update(deltaTime);

    this.elapsed += deltaTime;

    this.velocityY += this.gravity * deltaTime;

    this.y += this.velocityY * deltaTime;

    const progress = Math.min(this.elapsed / this.lifetime, 1);
    const currentScale = this.initialScale +
      (this.targetScale - this.initialScale) * progress;
    this.scale = currentScale;

    if (this.elapsed > this.fadeStart) {
      const fadeProgress = (this.elapsed - this.fadeStart) /
        (this.lifetime - this.fadeStart);
      this.alpha = Math.max(1 - fadeProgress, 0);
    }

    if (this.elapsed >= this.lifetime) {
      this.remove();
    }
  }
}
