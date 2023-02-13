import React from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

export interface WordCloudProps {
  words: Word[];
}

export type Word = { token: string, freq: number };

interface WordCloudState {
  svgId: string;
  cardId: string;
}

interface CloudConfig {
  font: string,
  minSize: number,
  maxSize: number,
  colors: string[]
}

export class WordCloud extends React.Component<WordCloudProps, WordCloudState> {
  protected layout;
  protected resizeTimeout;

  protected config: CloudConfig = {
    font: 'Roboto',
    minSize: 15,
    maxSize: 45,
    colors: ['#880000', '#504F4B', '#cf5511', '#417394']
  }

  constructor(props: WordCloudProps) {
    super(props);
    const id: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(2, 10);

    this.state = {
      svgId: 'word-cloud-' + id,
      cardId: 'word-cloud-card-' + id
    };

    this.draw = this.draw.bind(this);

    window.addEventListener('resize', () => {
      this.onResize();
    }, false);
  }

  onResize() {
    clearTimeout(this.resizeTimeout);

    this.resizeTimeout = setTimeout(() => {
      this.buildCloud();
    }, 1000);
  }

  getWidth(): number {
    const container: HTMLElement|null = this.getCard()?.querySelector('.card-body');

    if (!container) {
      return 500;
    }

    const style: CSSStyleDeclaration = getComputedStyle(container);

    return container.clientWidth - parseFloat(style.padding) * 2;
  }

  componentDidUpdate() {
    this.buildCloud();
  }

  componentDidMount() {
    this.buildCloud();
  }

  buildCloud() {
    if (this.layout) {
      this.layout = null;
      this.getSVG().innerHTML = '';
    }

    let minFreq = 1;
    let maxFreq = 0;

    this.props.words.forEach((word: Word) => {
      if (word.freq < minFreq) minFreq = word.freq;
      if (word.freq > maxFreq) maxFreq = word.freq;
    })

    const words = this.props.words.map((d: Word) => {
      let size: number = (d.freq - minFreq) / (maxFreq - minFreq);
      size *= 150;

      if (size > this.config.maxSize) size = this.config.maxSize;
      if (size < this.config.minSize) size = this.config.minSize;

      return { text: d.token, size: size };
    });

    this.layout = cloud()
      .size([this.getWidth(), 650])
      .words(words)
      .padding(5)
      .rotate(function() { return ~~(Math.random() * 3) * 45; })
      .font(this.config.font)
      .fontSize((d: cloud.Word) => { return d.size ?? 10; })
      .on("end", this.draw);

    this.layout.start();
  }

  getSVG(): HTMLElement {
    return document.getElementById(this.state.svgId) as HTMLElement;
  }

  getCard(): HTMLElement {
    return document.getElementById(this.state.cardId) as HTMLElement;
  }

  protected draw(words: cloud.Word[]) {
    d3.select(this.getSVG())
      .attr("width", this.layout.size()[0])
      .attr("height", this.layout.size()[1])
      .append("g")
      .attr("transform", "translate(" + this.layout.size()[0] / 2 + "," + this.layout.size()[1] / 2 + ")")
      .selectAll("text")
      .data(words)
      .enter().append("text")
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-family", this.config.font)
      .attr("text-anchor", "middle")
      .attr("fill", (d) => {
        return this.config.colors[Math.floor(Math.random() * this.config.colors.length)];
      })
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d: cloud.Word) { return d.text ?? ''; });
  }

  render() {
    return (
      <div className="card" id={this.state.cardId}>
        <h4 className="card-header">
          Mots-clés
        </h4>
        <div className="card-body">
          <svg id={this.state.svgId} />
        </div>
        <div className="card-footer text-muted">
          <small>
            Mots-clés qui ressortent en particulier pour ce canard (TF-IDF)
          </small>
        </div>
      </div>
    );
  }
}