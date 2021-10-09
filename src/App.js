import React, { Component } from 'react';
import './App.css';
import { Section } from './components/Section/Section';
import { Statistics } from './components/Statistics/Statistics';
import { FeedbackOptions } from './components/FeedbackOptions/FeedbackOptions';
import { Notification } from './components/Notification/Notification';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  addFeedback = option => {
    this.setState(state => ({
      [option]: state[option] + 1,
    }));
  };

  countTotalFeedback = () => {
    return Object.values(this.state).reduce((acc, option) => acc + option, 0);
  };

  countPositiveFeedbackPercentage = () => {
    const positiveFeedback =
      Math.round((this.state.good / this.countTotalFeedback()) * 100) || 0;
    return positiveFeedback;
  };

  render() {
    const { good, neutral, bad } = this.state;

    return (
      <div className="container">
        <Section>
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.addFeedback}
          />
        </Section>
        <Section title="Statistics">
          {this.countTotalFeedback() ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            ></Statistics>
          ) : (
            <Notification />
          )}
        </Section>
      </div>
    );
  }
}

export default App;
