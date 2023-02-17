import React from 'react';
import * as d3 from 'd3';
import { UserWeek } from './User';

export interface DateTimeProps {
  week: UserWeek;
}

interface DateTimeState {}

export class DateTime extends React.Component<DateTimeProps, DateTimeState> {
  protected id: string;
  protected resizeTimeout;
  protected width: number = 0;

  protected static readonly Colors = {
    NoActivity: '#fff',
    Activity: '#417394',
    HighActivity: '#9b2a2a',
  };

  constructor(props: DateTimeProps) {
    super(props);
    this.state = {};
    this.id =
      'heatmap-' +
      Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substring(2, 10);

    window.addEventListener(
      'resize',
      () => {
        this.onResize();
      },
      false,
    );
  }

  onResize() {
    clearTimeout(this.resizeTimeout);

    this.resizeTimeout = setTimeout(() => {
      const winWidth: number = window.innerWidth;

      if (winWidth !== this.width) {
        this.width = winWidth;
        this.buildHeatMap();
      }
    }, 1000);
  }

  componentDidUpdate() {
    this.buildHeatMap();
  }

  componentDidMount() {
    this.buildHeatMap();
  }

  getWidth(): number {
    const container: HTMLElement | null = this.getContainer();

    if (!container) {
      return 450;
    }

    const style: CSSStyleDeclaration = getComputedStyle(container);

    return container.clientWidth - parseFloat(style.padding) * 2;
  }

  protected getContainer(): HTMLElement {
    return document.getElementById(this.id) as HTMLElement;
  }

  buildHeatMap() {
    const container: HTMLElement = this.getContainer();

    if (!container) {
      return;
    }

    const margin = 35,
      width = this.getWidth() - margin,
      height = 450 - margin;

    container.innerHTML = '';

    const svg = d3
      .select(container)
      .append('svg')
      .attr('width', width + margin * 2)
      .attr('height', height + margin * 2)
      .append('g')
      .attr('transform', `translate(${margin},${margin})`);

    const hours = [
      '0',
      '2',
      '4',
      '6',
      '8',
      '10',
      '12',
      '14',
      '16',
      '18',
      '20',
      '22',
    ];
    const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const x = d3.scaleBand().range([0, width]).domain(hours).padding(0.01);

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    const y = d3.scaleBand().range([0, height]).domain(days).padding(0.01);

    svg.append('g').call(d3.axisLeft(y));

    type DataLine = {
      day: string;
      hour: string;
      value: number;
    };

    const data: DataLine[] = [];
    let max: number = 0;

    for (const weekDay of Object.keys(this.props.week)) {
      for (const hour of Object.keys(this.props.week[weekDay])) {
        const postCount: number = this.props.week[weekDay][hour];

        data.push({
          day: days[parseInt(weekDay) - 1],
          hour: hour,
          value: postCount,
        });

        if (postCount > max) {
          max = postCount;
        }
      }
    }

    const colors = d3
      .scaleLinear()
      .range([
        DateTime.Colors.NoActivity,
        DateTime.Colors.Activity,
        DateTime.Colors.HighActivity,
      ] as any)
      .domain([0, max / 2, max] as any);

    svg
      .selectAll()
      .data(data)
      .join('rect')
      .attr('x', function (d) {
        return x(d.hour) as number;
      })
      .attr('y', function (d) {
        return y(d.day) as number;
      })
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', function (d) {
        return colors(d.value as any) as any;
      });
  }

  render() {
    return (
      <div className="card">
        <h4 className="card-header">Heures d'activités</h4>
        <div className="card-body">
          <div id={this.id}></div>
        </div>
        <div className="card-footer text-muted">
          <small>Activité :</small>
          <span
            className="badge me-2"
            style={{
              backgroundColor: DateTime.Colors.NoActivity,
              color: 'black',
            }}
          >
            Aucune
          </span>
          <span
            className="badge me-2"
            style={{ backgroundColor: DateTime.Colors.Activity }}
          >
            Normale
          </span>
          <span
            className="badge"
            style={{ backgroundColor: DateTime.Colors.HighActivity }}
          >
            Maximum
          </span>
        </div>
      </div>
    );
  }
}
