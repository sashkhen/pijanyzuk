"use client";
import { Button, Spin } from "antd";
import clsx from "clsx";
import JSConfetti from "js-confetti";
import { useEffect, useMemo, useState } from "react";

import { CONFETTI_CONFIG } from "@/consts";
import { useCheating, useKeyHold, useReady } from "@/hooks";
import MasterMindGame from "@/utils/masterMindGame";
import { ArrowUpOutlined, CloseOutlined } from "@ant-design/icons";

import GameField from "./GameField";
import styles from "./MasterMind.module.scss";
import Match from "./Match/Match";
import Sequence, { SequenceType } from "./Sequence";
import Item from "./SequenceItem";

/**
 * todo:
 * - initialize first game on server instead of waiting for isReady
 */

const MasterMind = () => {
  const isReady = useReady();
  const isCheatingEnabled = useCheating();
  const [isCheating, setCheating] = useState(false);
  const [{ game }, setGame] = useState<{ game?: MasterMindGame }>({});
  const attemptsList = useMemo(
    () => Array.from(Array(game?.maxAttemptsCount)),
    [game?.maxAttemptsCount]
  );

  useEffect(() => {
    setGame({ game: new MasterMindGame() });
  }, [isReady]);

  useEffect(() => {
    if (!game?.isGameOver) return;

    const jsConfetti = new JSConfetti();

    jsConfetti
      .addConfetti(CONFETTI_CONFIG[game?.isGameWon ? "won" : "lost"])
      .then(() => {
        jsConfetti.clearCanvas();
      });
  }, [game?.isGameOver, game?.isGameWon]);

  const submitSequence = () => {
    game?.submitSequence();
    setGame({ game });
  };

  const setActive = (index: number) => {
    game?.setActive(index);
    setGame({ game });
  };

  const setValue = (value: string) => {
    game?.updateIndex(game.activeIndex, value);
    game?.setNextActive();
    setGame({ game });
  };

  const clearValue = (index: number) => {
    game?.clearIndex(index);
    setGame({ game });
  };

  useKeyHold(
    "m",
    () => setCheating(true),
    () => setCheating(false),
    isCheatingEnabled
  );

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Welcome to <b>MeowsterMind</b> Game
        </h1>
        <Button
          type="link"
          href="https://www.wikihow.com/Play-Mastermind"
          target="_blank"
        >
          How to play
        </Button>

        <div>
          <div className={styles.legend}>
            <Match data={[2, 1, 0, 0]} />
            <div>
              <p>
                <code className={styles.purple}>purple</code> = guessed color
                and position
              </p>
              <p>
                <code className={styles.pink}>pink</code> = guessed color, but
                not position
              </p>
            </div>
          </div>
        </div>
      </div>
      <main className={clsx(styles.content, !game && styles.empty)}>
        {game ? (
          <GameField>
            <Sequence type={SequenceType.ORIGINAL}>
              <li />
              {game.originalSequence?.map((value, i) => (
                <Item
                  key={`original-${value}-${i}`}
                  value={isCheating || game?.isGameOver ? value : undefined}
                />
              ))}
            </Sequence>
            <GameField.Line />
            {attemptsList.map((_, i, arr) => {
              const index = arr.length - i - 1;
              const sequence =
                game.attempts[index] ||
                game.generateBlankSequence(game.originalSequence.length);
              const result = game.results[index];

              return (
                <Sequence key={`attempt-${index}`} type={SequenceType.ATTEMPT}>
                  {result ? <Match data={result} /> : <li />}
                  {sequence.map((value, i) => (
                    <Item
                      key={`attempt-${index}-${value}-${i}`}
                      value={value}
                    />
                  ))}
                </Sequence>
              );
            })}
            <GameField.Line />
            <Sequence type={SequenceType.CURRENT}>
              <li />
              {game.currentSequence.map((value, i) => (
                <Item
                  key={`current-${value}-${i}`}
                  value={value}
                  active={!game.isGameOver && game.activeIndex === i}
                  onClick={() => setActive(i)}
                  disabled={game.isGameOver}
                >
                  {value && (
                    <Button
                      shape="circle"
                      size="small"
                      icon={<CloseOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        clearValue(i);
                      }}
                    />
                  )}
                </Item>
              ))}
              <Button
                type="primary"
                size="large"
                block
                icon={<ArrowUpOutlined />}
                onClick={submitSequence}
                disabled={!game.isSequenceValid}
              />
            </Sequence>
            <Sequence>
              {game.options.map((value, i) => (
                <Item
                  key={`options-${value}-${i}`}
                  value={value}
                  onClick={() => setValue(value)}
                  disabled={game.isGameOver || game.activeIndex === undefined}
                />
              ))}
            </Sequence>
          </GameField>
        ) : (
          <Spin size="large" />
        )}
      </main>
    </div>
  );
};

export default MasterMind;
