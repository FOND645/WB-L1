// Задача на классы и наследование: создайте базовый класс
// Shape (фигура), который имеет методы для расчета площади и
// периметра. Затем создайте подклассы, представляющие различные
// фигуры, такие как прямоугольник, круг и треугольник. Реализуйте
// методы расчета площади и периметра для каждой фигуры.

class Shape {
    getLineLength(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }

    hasDuplicatePoints(pointsArray) {
        return (
            new Set(pointsArray.map((Point) => JSON.stringify(Point))).size !==
            pointsArray.length
        );
    }

    isRectangle(p1, p2, p3, p4) {
        if (this.hasDuplicatePoints([p1, p2, p3, p4])) return false;
        const distances = [
            this.getLineLength(p1, p2),
            this.getLineLength(p1, p3),
            this.getLineLength(p1, p4),
            this.getLineLength(p2, p3),
            this.getLineLength(p2, p4),
            this.getLineLength(p3, p4),
        ];
        const lengthsCountObj = {};
        distances.forEach((Dist) => {
            if (lengthsCountObj.hasOwnProperty(Dist.toString())) {
                lengthsCountObj[Dist.toString()]++;
            } else {
                lengthsCountObj[Dist.toString()] = 1;
            }
        });
        const lengths = (() => {
            let result = [];
            for (let dist in lengthsCountObj) {
                result.push(+dist);
            }
            return result;
        })();
        return new Set(lengths).size === 3;
    }

    isNormalTriangle(p1, p2, p3) {
        const A = this.getLineLength(p1, p2);
        const B = this.getLineLength(p2, p3);
        const C = this.getLineLength(p1, p3);
        const p = (A + B + C) / 2;
        return Math.sqrt(p * (p - A) * (p - B) * (p - C)) !== 0;
    }

    isSquare(p1, p2, p3, p4) {
        if (this.hasDuplicatePoints([p1, p2, p3, p4])) return false;
        const distances = [
            this.getLineLength(p1, p2),
            this.getLineLength(p1, p3),
            this.getLineLength(p1, p4),
            this.getLineLength(p2, p3),
            this.getLineLength(p2, p4),
            this.getLineLength(p3, p4),
        ];
        return new Set(distances).size <= 2;
    }
}

class Triangle extends Shape {
    constructor(p1, p2, p3) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }

    isDegenerateTriangle() {
        return !this.isNormalTriangle(this.p1, this.p2, this.p3);
    }

    getSquare() {
        const A = this.getLineLength(p1, p2);
        const B = this.getLineLength(p3, p2);
        const C = this.getLineLength(p1, p3);
        const p = (A + B + C) / 2;
        return Math.sqrt(p * (p - A) * (p - B) * (p - C));
    }

    getPerimeter() {
        const A = this.getLineLength(p1, p2);
        const B = this.getLineLength(p3, p2);
        const C = this.getLineLength(p1, p3);
        return A + B + C;
    }
}

class Square extends Shape {
    constructor(p1, p2, p3, p4) {
        if (!this.isSquare(p1, p2, p3, p4))
            throw new Error('Точки не образуют квадрат');
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
    }
    getSquare() {
        const distances = [
            this.getLineLength(this.p1, this.p2),
            this.getLineLength(this.p1, this.p3),
            this.getLineLength(this.p1, this.p4),
            this.getLineLength(this.p2, this.p3),
            this.getLineLength(this.p2, this.p4),
            this.getLineLength(this.p3, this.p4),
        ];
        return Math.pow(Math.min(...distances), 2);
    }
    getPerimeter() {
        const distances = [
            this.getLineLength(this.p1, this.p2),
            this.getLineLength(this.p1, this.p3),
            this.getLineLength(this.p1, this.p4),
            this.getLineLength(this.p2, this.p3),
            this.getLineLength(this.p2, this.p4),
            this.getLineLength(this.p3, this.p4),
        ];
        return Math.min(...distances) * 4;
    }
}

class Round {
    constructor(p1, radius) {
        this.p1 = p1;
        this.radius = radius;
    }

    getPerimeter() {
        return 2 * Math.PI * this.radius;
    }

    getSquare() {
        return Math.PI * Math.pow(this.radius, 2);
    }
}

class Rectangle extends Shape {
    constructor(p1, p2, p3, p4) {
        if (!this.isRectangle(p1, p2, p3, p4))
            throw new Error('Точки не образуют прямоугольник');
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
    }

    getSquare() {
        const distances = Array.from(
            new Set(
                [
                    this.getLineLength(this.p1, this.p2),
                    this.getLineLength(this.p1, this.p3),
                    this.getLineLength(this.p1, this.p4),
                    this.getLineLength(this.p2, this.p3),
                    this.getLineLength(this.p2, this.p4),
                    this.getLineLength(this.p3, this.p4),
                ].sort((A, B) => A - B)
            )
        );
        return distances[0] * distances[1];
    }

    getPerimeter() {
        const distances = Array.from(
            new Set(
                [
                    this.getLineLength(this.p1, this.p2),
                    this.getLineLength(this.p1, this.p3),
                    this.getLineLength(this.p1, this.p4),
                    this.getLineLength(this.p2, this.p3),
                    this.getLineLength(this.p2, this.p4),
                    this.getLineLength(this.p3, this.p4),
                ].sort((A, B) => A - B)
            )
        );
        return (distances[0] + distances[1]) * 2;
    }
}
