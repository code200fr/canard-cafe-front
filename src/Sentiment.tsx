import React from "react";
import * as d3 from "d3";
import { UserSentiments } from "./User";

export interface SentimentProps {
  sentiments: UserSentiments;
}

interface SentimentState {

}

export class Sentiment extends React.Component<SentimentProps, SentimentState> {
  protected id: string;
  protected percents: UserSentiments;
  protected resizeTimeout;

  constructor(props: SentimentProps) {
    super(props);
    this.state = {};
    this.id = 'sentiment-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substring(2, 10);
    this.percents = this.computePercents();

    window.addEventListener('resize', () => {
      this.onResize();
    }, false);
  }

  onResize() {
    clearTimeout(this.resizeTimeout);

    this.resizeTimeout = setTimeout(() => {
      this.buildPie();
    }, 1000);
  }

  protected computePercents(): UserSentiments {
    const total: number = this.props.sentiments.negative +
      this.props.sentiments.neutral +
      this.props.sentiments.positive;

    return {
      negative: Math.round((this.props.sentiments.negative / total) * 100),
      neutral: Math.round((this.props.sentiments.neutral / total) * 100),
      positive: Math.round((this.props.sentiments.positive / total) * 100)
    }
  }

  componentDidUpdate() {
    this.buildPie();
  }

  componentDidMount() {
    this.buildPie();
  }

  getWidth(): number {
    const container: HTMLElement|null = this.getContainer();

    if (!container) {
      return 450;
    }

    const style: CSSStyleDeclaration = getComputedStyle(container);

    return container.clientWidth - parseFloat(style.padding) * 2;
  }

  protected getContainer(): HTMLElement {
    return document.getElementById(this.id) as HTMLElement;
  }

  buildPie() {
    const width = this.getWidth();
    const height = width;
    const margin = 20;
    const radius = Math.min(width, height) / 2 - margin;

    const container: HTMLElement = this.getContainer();
    container.innerHTML = '';

    const svg = d3.select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const data = {...{}, ...this.props.sentiments};
    delete data._id;

    const color = d3.scaleOrdinal()
      .range(['#9b2a2a', '#504F4B', '#69b3a2'])

    const pie = d3.pie()
      .value(function(d) {return d[1]})

    const data_ready = pie(Object.entries(data) as any);

    const arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius)

    svg
      .selectAll('mySlices')
      .data(data_ready)
      .join('path')
      .attr('d', arcGenerator as any)
      .attr('fill', function(d){ return(color(d.data[0]) as string) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)

    svg
      .selectAll('mySlices')
      .data(data_ready)
      .join('image')
      .attr("xlink:href", (d) => {
        switch (d.data[0] as string) {
          case 'negative': return "https://forum.canardpc.com/images/smilies/hum.png";
          case 'neutral': return "https://forum.canardpc.com/images/smilies/mouais.gif";
          case 'positive': return "https://forum.canardpc.com/images/smilies/lapinsmilecn5.png";
        }

        return '';
      })
      .attr("transform", function(d) {
        const center = arcGenerator.centroid(d as any);
        center[0] -= 24;
        center[1] -= 24;

        return `translate(${center})scale(2)`
      })
      .style("text-anchor", "middle")
  }

  render() {
    return (
      <div className="card">
        <h4 className="card-header">
          Sentiments
        </h4>
        <div className="card-body">
          <div id={this.id}></div>
        </div>
        <div className="card-footer text-muted">
          Négatif: <strong>{this.percents.negative}%</strong> ·
          Neutre: <strong>{this.percents.neutral}%</strong> ·
          Positif: <strong>{this.percents.positive}%</strong>
        </div>
      </div>
    );
  }
}